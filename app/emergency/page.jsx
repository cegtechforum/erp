import { getEventsFromDb } from "@/app/_lib/dataFetching";
import AppSidebar from "@/components/app-sidebar";
import EmergencyForm from "@/components/EmergencyForm";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function EventsPage() {
  const eventsData = await getEventsFromDb();

  return (
    <div className="flex h-full min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="h-full w-full">
          <SidebarTrigger />
          <EmergencyForm name="Emergency Requests" events={eventsData} />
        </main>
      </SidebarProvider>
    </div>
  );
}
