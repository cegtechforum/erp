"use client";
import {
  Calendar,
  ShoppingCart,
  LogOut,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import toast from "react-hot-toast";

export function AppSidebar({ isSuperUser }) {
  const currentPath = usePathname();

  // Define the items dynamically based on isSuperUser
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    ...(isSuperUser
      ? [
          {
            title: "Events",
            url: "/events",
            icon: Calendar,
          },
        ]
      : []),
    {
      title: "Add Event",
      url: "/events/add",
      icon: Plus,
    },
    {
      title: "Items",
      url: "/items",
      icon: ShoppingCart,
    },
    {
      title: "Logout",
      icon: LogOut,
      action: async () => {
        try {
          await axios.get("/api/logout");
          toast.success("Logout Successful");
          window.location.href = "/";
        } catch (error) {
          console.error("Logout failed:", error);
          toast.error(error.message || "Logout Failed");
        }
      },
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-2xl font-bold">
            ERP
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => {
                const isActive = item.url === currentPath;

                return (
                  <SidebarMenuItem key={`${item.title}-${index}`}>
                    <SidebarMenuButton asChild>
                      {item.url ? (
                        <Link href={item.url}>
                          <div
                            className={`flex w-full items-center p-4 transition-colors duration-100 ${
                              isActive
                                ? "bg-gray-300 text-black"
                                : "text-gray-400"
                            } rounded-lg hover:bg-gray-100 hover:text-gray-700`}
                          >
                            <item.icon />
                            <span className="ml-2 w-full text-lg">
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className={`flex items-center p-4 transition-colors duration-200 ${
                            isActive
                              ? "bg-gray-300 text-black"
                              : "text-gray-400"
                          } rounded-lg hover:bg-gray-100 hover:text-gray-700`}
                        >
                          <item.icon />
                          <span className="ml-2 text-lg">{item.title}</span>
                        </button>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
