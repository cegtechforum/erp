import { db } from "@/app/_lib/db";
import { lists, events, items, itemsHistory } from "../../_db/schema";
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

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    // Get historical snapshots
    const monthlySnapshots = await db
      .select()
      .from(itemsHistory)
      .where(
        and(
          sql`snapshot_date >= ${startOfMonth}`,
          sql`snapshot_date <= ${endOfMonth}`,
        ),
      );

    // Normalize snapshot dates
    const normalizedStartOfMonth = new Date(
      startOfMonth.toISOString().split("T")[0],
    );
    const normalizedEndOfMonth = new Date(
      endOfMonth.toISOString().split("T")[0],
    );

    const startSnapshot = new Map(
      monthlySnapshots
        .filter(
          (s) =>
            new Date(s.snapshot_date).getTime() ===
            normalizedStartOfMonth.getTime(),
        )
        .map((s) => [s.name, s.count]),
    );

    const endSnapshot = new Map(
      monthlySnapshots
        .filter(
          (s) =>
            new Date(s.snapshot_date).getTime() ===
            normalizedEndOfMonth.getTime(),
        )
        .map((s) => [s.name, s.count]),
    );

    // Get event data
    const eventListsData = await db
      .select({
        eventId: events.eventId,
        eventName: events.eventName,
        itemName: lists.itemName,
        requestedCount: lists.count,
        approvedCount: lists.approvedCount,
        acceptedTime: events.acceptedTime,
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

    // Get current inventory
    const currentItems = await db.select().from(items);

    // Combine all unique items
    const allItems = new Set([
      ...Array.from(startSnapshot.keys()),
      ...Array.from(endSnapshot.keys()),
      ...eventListsData.map((d) => d.itemName),
      ...currentItems.map((i) => i.name),
    ]);

    // Generate report data
    const eventNames = Array.from(
      new Set(eventListsData.map((d) => d.eventName)),
    );

    const reportData = Array.from(allItems).map((itemName) => {
      const row = {
        ItemName: itemName,
        StartCount: startSnapshot.get(itemName) || 0,
        EndCount: endSnapshot.get(itemName) || 0,
        CurrentCount: currentItems.find((i) => i.name === itemName)?.count || 0,
        TotalRequested: 0,
        TotalApproved: 0,
      };

      // Initialize event-specific columns
      eventNames.forEach((eventName) => {
        row[`${eventName}_Requested`] = 0;
        row[`${eventName}_Approved`] = 0;
      });

      // Aggregate requests and approvals
      eventListsData
        .filter((d) => d.itemName === itemName)
        .forEach((d) => {
          row[`${d.eventName}_Requested`] += d.requestedCount || 0;
          row[`${d.eventName}_Approved`] += d.approvedCount || 0;
          row.TotalRequested += d.requestedCount || 0;
          row.TotalApproved += d.approvedCount || 0;
        });

      return row;
    });

    // Generate Excel file
    const header = [
      "ItemName",
      "StartCount",
      "EndCount",
      "CurrentCount",
      "TotalRequested",
      "TotalApproved",
      ...eventNames.flatMap((name) => [
        `${name}_Requested`,
        `${name}_Approved`,
      ]),
    ];

    const ws = XLSX.utils.json_to_sheet(reportData, { header });
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
      { error: "Failed to generate the monthly report." },
      { status: 500 },
    );
  }
}
