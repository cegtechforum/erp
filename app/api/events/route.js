import { drizzle } from 'drizzle-orm/neon-http';
import { events } from '../../_db/schema';
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import 'dotenv/config';

const pool = neon(process.env.DATABASE_URL);
const db = drizzle(pool);

export async function POST(req) {
  try {
    
    const data = await req.json();
    console.log(data);

    const result = await db.insert(events).values(data);
    console.log(result);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
