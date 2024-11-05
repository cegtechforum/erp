import { db } from "@/app/_lib/db";
import { events } from "@/app/_db/schema";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import EventsList from "@/components/EventsList";
import { eq } from "drizzle-orm";
import toast from "react-hot-toast";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  if (!token) {
    redirect("/login");
  }

  let userEvents = [];

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    const userDomain = payload.domain;

    userEvents = await db
      .select()
      .from(events)
      .where(eq(events.domain, userDomain));
  } catch (error) {
    console.error("Error fetching events:", error);
    toast.error(error.message || "Error Occured");
  }

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="h-full w-full bg-gray-200">
          <SidebarTrigger />
          <EventsList name="Dashboard" events={userEvents} />
        </main>
      </SidebarProvider>
    </div>
  );
}
