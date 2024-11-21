import { getEventsFromDb } from "@/app/_lib/dataFetching";
import AppSidebar from "@/components/AppSidebar";
import EventsList from "@/components/EventsList";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

export default async function EventsPage() {
  const eventsData = await getEventsFromDb();
  const token = (await cookies()).get("token")?.value;
  let isSuperUser = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      isSuperUser = payload.isSuperUser;
    } catch (error) {
      console.error("Token verification failed:", error);
      toast.error(error.message || "Error occured");
    }
  }

  return (
    <div className="flex h-full min-h-screen">
      <SidebarProvider>
        <AppSidebar isSuperUser={isSuperUser} />
        <main className="h-full w-full">
          <SidebarTrigger />
          <EventsList name="Events" events={eventsData} />
        </main>
      </SidebarProvider>
    </div>
  );
}
