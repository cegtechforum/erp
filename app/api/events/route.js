import { events as ev, lists as lt } from '../../_db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/app/_lib/db';

export async function POST(req) {
  try {
    const dt = await req.json();
    const res = await db.insert(ev).values(dt.events).returning();
    const eid = res[0].eventId;

    if (!eid) return NextResponse.json({ msg: 'Event creation failed.' }, { status: 404 });

    if (Array.isArray(dt.list)) {
      for (let i = 0; i < dt.list.length; i++) {
        db.insert(lt).values({
          event_id: eid,
          item_name: dt.list[i].item_name,
          count: dt.list[i].count,
          category: dt.list[i].category,
        });
      }
    }
    return NextResponse.json({ msg: 'Event created.' }, { status: 200 });
  } catch (err) {
    console.error('Insert err:', err);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rs = await db.select().from(ev);
    return NextResponse.json(rs, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { eventId: eid, status: st } = await req.json();
    if (!eid || !st) return NextResponse.json({ msg: 'Event ID and status needed.' }, { status: 400 });

    const rs = await db.update(ev).set({ status: st }).where(eq(ev.eventId, eid)).returning();
    if (rs.length === 0) return NextResponse.json({ msg: 'Event not found.' }, { status: 404 });

    return NextResponse.json({ msg: 'Status updated', event: rs[0] }, { status: 200 });
  } catch (err) {
    console.error('Update err:', err);
    return NextResponse.json({ msg: 'Server error' }, { status: 500 });
  }
}
