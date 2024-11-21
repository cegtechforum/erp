import AddEventForm from "@/components/AddEventForm";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

export default async function EventFormPage() {
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
    <div className="flex h-full min-h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar isSuperUser={isSuperUser} />
        <main className="h-full w-full overflow-hidden">
          <SidebarTrigger />
          <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 px-6">
            <AddEventForm />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
