import { db } from "@/app/_lib/db";
import { lists, events, items } from "../../_db/schema";
import { eq, and, sql } from "drizzle-orm";
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const month = parseInt(url.searchParams.get("month"), 10);
    const year = parseInt(url.searchParams.get("year"), 10);

    if (
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12 ||
      !Number.isInteger(year)
    ) {
      return NextResponse.json(
        { error: "Invalid Month or Year provided." },
        { status: 400 },
      );
    }

    const eventListsData = await db
      .select({
        eventId: events.eventId,
        eventName: events.eventName,
        itemName: lists.itemName,
        approvedCount: lists.approvedCount,
      })
      .from(events)
      .innerJoin(lists, eq(events.eventId, lists.eventId))
      .where(
        and(
          eq(events.status, "accepted"),
          sql`EXTRACT(MONTH FROM ${events.acceptedTime}) = ${month}`,
          sql`EXTRACT(YEAR FROM ${events.acceptedTime}) = ${year}`,
        ),
      );

    // if (eventListsData.length === 0) {
    //   return NextResponse.json({ message: "No data found" }, { status: 404 });
    // }

    const itemsData = await db.select().from(items);
    const eventNames = Array.from(
      new Set(eventListsData.map((data) => data.eventName)),
    );

    const reportData = [];
    const itemLookup = new Map();

    itemsData.forEach((item) => {
      itemLookup.set(item.name, {
        AvailableItem: item.count || 0,
        TotalAccepted: 0,
      });
    });

    eventListsData.forEach((data) => {
      const itemName = data.itemName;
      const isKnownItem = itemLookup.has(itemName);
      const displayName = isKnownItem ? itemName : `#${itemName}`;

      if (!itemLookup.has(displayName)) {
        itemLookup.set(displayName, {
          AvailableItem: isKnownItem
            ? itemLookup.get(itemName).AvailableItem
            : 0,
          TotalAccepted: 0,
          ...Object.fromEntries(eventNames.map((name) => [name, 0])),
        });
      }

      const rowData = itemLookup.get(displayName);
      const approvedCount = data.approvedCount ?? 0;

      rowData[data.eventName] = (rowData[data.eventName] || 0) + approvedCount;
      rowData.TotalAccepted += approvedCount;
    });

    const reportDataArray = Array.from(itemLookup.entries()).map(
      ([ItemName, rowData]) => ({
        ItemName,
        ...rowData,
      }),
    );

    const header = [
      "ItemName",
      "AvailableItem",
      "TotalAccepted",
      ...eventNames,
    ];
    const ws = XLSX.utils.json_to_sheet(reportDataArray, { header });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Monthly Report ${month}-${year}`);

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    const safeFilename = `monthly_item_report_${month}_${year}`.replace(
      /[^a-zA-Z0-9-_\.]/g,
      "_",
    );
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${safeFilename}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      {
        error: "Failed to generate the monthly report. Please try again later.",
      },
      { status: 500 },
    );
  }
}
