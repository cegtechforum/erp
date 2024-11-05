import { db } from '@/app/_lib/db'; // Adjust the import based on your project structure
import { lists,events } from '../../_db/schema'; // Adjust this path according to your schema
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function POST(req) {
    try {
      const dt = await req.json();
      console.log(dt);
      const result = await db
      .select()
      .from(events)
      .where(eq(events.eventId,dt.eventId));
      console.log(result);   
      if (Array.isArray(result)) {   
          db.insert(lists).values(dt);
          return NextResponse.json({ msg: 'requested item added successfully.' }, { status: 200 });

      }else{        
        return NextResponse.json({ msg: 'Event not found.' }, { status: 404 });
    }
    } catch (err) {
      console.error('Insert err:', err);
      return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
  }
  