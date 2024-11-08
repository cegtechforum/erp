
import { db } from '@/app/_lib/db';
import { lists, users } from '../../_db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { sendEmail } from './email';

export async function POST(req) {
  try {
    const dt = await req.json();
    console.log(dt);

    const duplicateItems = [];

    for (let i = 0; i < dt.items.length; i++) {
      try {
        await db.insert(lists).values(dt.items[i]);
      } catch (err) {
        if (err.message.includes("duplicate key value violates unique constraint")) {
          duplicateItems.push(dt.items[i].itemName);
          continue;
        } else {
          throw err;
        }
      }
    }

    const superUsers = await db.select().from(users).where(eq(users.domain, 'logistics'));
    console.log(superUsers);

    await sendEmail(dt, superUsers);

    if (duplicateItems.length > 0) {
      return NextResponse.json(
        { msg: `These Items already exist: ${duplicateItems.join(', ')}` },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { msg: 'Requested items added successfully and emails sent to super users.' },
      { status: 200 }
    );

  } catch (err) {
    if (err.message.includes('violates foreign key constraint')) {
      return NextResponse.json({ msg: 'Event not found' }, { status: 404 });
    } else if (err.message.includes("Invalid login: 535-5.7.8 Username and Password not accepted")) {
      return NextResponse.json({ msg: 'An error in sending email to super users' }, { status: 401 });
    } else {
      console.error('Insert error:', err);
      return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const result = await db.select().from(lists).where(lists.eventId.eq(id));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
