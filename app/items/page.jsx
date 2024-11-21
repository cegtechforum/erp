import { jwtVerify } from "jose";
import toast from "react-hot-toast";
import Items from "@/components/Items";
import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

async function ItemsPage() {
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
    <div className="mx-auto flex min-h-screen w-full flex-col">
      <SidebarProvider>
        <AppSidebar isSuperUser={isSuperUser} />
        <main className="h-full w-full bg-gray-200">
          <SidebarTrigger />
          <Items isSuperUser={isSuperUser} />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default ItemsPage;
