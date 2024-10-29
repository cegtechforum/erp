import { events } from '../../_db/schema';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/app/_lib/db';

export async function POST(req) {
  try {
    const data = await req.json();

    const insertEventQuery = sql`INSERT INTO events (event_name, description, roll_no, contact, organizer_name, domain, event_date, start_time, end_time) 
      VALUES (${data.events.eventName}, ${data.events.description}, ${data.events.rollNo}, ${data.events.contact}, ${data.events.organizerName}, ${data.events.domain}, ${data.events.date}, ${data.events.startTime}, ${data.events.endTime}) 
      RETURNING event_id`;

    const eventResult = await db.execute(insertEventQuery);
    const eventId = eventResult.rows[0].event_id;

    if (!eventId) {
      return NextResponse.json({ message: 'Event creation failed, ID not found.' }, { status: 404 });
    }

    const listPromises = data.list.map(item => 
      db.execute(sql`INSERT INTO lists (event_id, product, count, category) VALUES (${eventId}, ${item.product}, ${item.count}, ${item.category})`)
    );

    await Promise.all(listPromises);

    return NextResponse.json({ message: 'Event and list items created successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error during insertion:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}



export async function GET( ) {
  try {
      const result = await db.select().from(events);
      return NextResponse.json(result,{status: 200});
  } catch (error) {
      console.error(error);
      return NextResponse.json({messgae:"internal server error"},{status:500});
}
}