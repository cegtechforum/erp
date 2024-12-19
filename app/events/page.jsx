import { getEventsFromDb } from "@/app/_lib/dataFetching";
import AppSidebar from "@/components/AppSidebar";
import EventsList from "@/components/EventsList";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import toast from "react-hot-toast";
import { getMegaEventsFromDb } from "@/app/_lib/dataFetching";

export default async function EventsPage() {
  const megaEvent = await getMegaEventsFromDb();
  const eventsData = await getEventsFromDb();
  const token = (await cookies()).get("token")?.value;
  let isSuperUser = false;
  let domain = "";
  let email = "";
  if (!token) {
    redirect("/login");
  }
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      isSuperUser = payload.isSuperUser;
      email = payload.email;
      domain = payload.domain;
    } catch (error) {
      console.error("Token verification failed:", error);
      toast.error(error.message || "Error occured");
    }
  }

  return (
    <div className="flex h-full min-h-screen">
      <SidebarProvider>
        <AppSidebar isSuperUser={isSuperUser} domain={domain} email={email} />
        <main className="h-full w-full">
          <SidebarTrigger />
          <EventsList
            name="Events"
            events={eventsData}
            isSuperUser={isSuperUser}
            megaEvent = {megaEvent}
          />
        </main>
      </SidebarProvider>
    </div>
  );
}
