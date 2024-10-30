import { db } from '@/app/_lib/db'; // Adjust the import based on your project structure
import { lists } from '../../_db/schema'; // Adjust this path according to your schema

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const result = await db.select().from(lists).where(lists.event_id.eq(id));
        return NextResponse.json(result,{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({messgae:"internal server error"},{status:500});
  }
  }