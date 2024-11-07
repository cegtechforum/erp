import { db } from '@/app/_lib/db';
import { lists, users } from '../../_db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const dt = await req.json();
    console.log(dt);

    await db.insert(lists).values(dt);

    const superUsers = await db.select().from(users).where(eq(users.domain, 'logistics'));
    console.log(superUsers);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    
    const htmlContent = `
      <h1>New Item Requested</h1>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Item Name</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Count</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Category</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${dt.itemName}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${dt.count}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${dt.category}</td>
        </tr>
      </table>
    `;

    for (const user of superUsers) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'New Item Requested',
        html: htmlContent,  // Use the HTML content here
      });
    }
    

    return NextResponse.json({ msg: 'Requested item added successfully and emails sent to super users.' }, { status: 200 });

  } catch (err) {
    if (err.message.includes('violates foreign key constraint')) {
      return NextResponse.json({ msg: 'Event not found' }, { status: 404 });
    }else if(err.message.includes("duplicate key value violates unique constraint")){
      return NextResponse.json({ msg: 'item already exists' }, { status: 403 });

    }else {
      console.error('Insert err:', err);
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
      { messgae: "internal server error" },
      { status: 500 },
    );
  }
}