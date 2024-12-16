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

    if (!month || !year) {
      return NextResponse.json(
        { error: "Month and Year are required." },
        { status: 400 }
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
          sql`EXTRACT(YEAR FROM ${events.acceptedTime}) = ${year}`
        )
      );

    if (eventListsData.length === 0) {
      return NextResponse.json(
        { message: "No data found" },
        { status: 404 }
      );
    }

    const itemsData = await db.select().from(items);

    const eventNames = Array.from(new Set(eventListsData.map((data) => data.eventName)));

    const reportData = [];
    const processedItems = new Set();

    eventListsData.forEach((data) => {
      const itemInItemsTable = itemsData.some((item) => item.name === data.itemName);

      let rowData = reportData.find((row) => row.ItemName === (itemInItemsTable ? data.itemName : `#${data.itemName}`));

      if (!rowData) {
        rowData = {
          ItemName: itemInItemsTable ? data.itemName : `#${data.itemName}`,
          AvailableItem: itemInItemsTable ? itemsData.find((item) => item.name === data.itemName)?.count || 0 : 0,
          TotalAccepted: 0,
        };

        eventNames.forEach((eventName) => {
          rowData[eventName] = 0;
        });

        reportData.push(rowData);
      }

      const totalApproved = data.approvedCount || 0;
      rowData[data.eventName] = (rowData[data.eventName] || 0) + totalApproved;
      rowData.TotalAccepted += totalApproved;
    });

    itemsData.forEach((item) => {
      if (!processedItems.has(item.name)) {
        let rowData = reportData.find((row) => row.ItemName === item.name);

        if (!rowData) {
          rowData = {
            ItemName: item.name,
            AvailableItem: item.count || 0,
            TotalAccepted: 0,
          };

          eventNames.forEach((eventName) => {
            rowData[eventName] = 0;
          });

          reportData.push(rowData);
        }

        processedItems.add(item.name);
      }
    });

    const header = ["ItemName", "AvailableItem", "TotalAccepted", ...eventNames];

    const ws = XLSX.utils.json_to_sheet(reportData, { header });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Monthly Report ${month}-${year}`);

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="monthly_item_report_${month}_${year}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate the monthly report. Please try again later." },
      { status: 500 }
    );
  }
}
