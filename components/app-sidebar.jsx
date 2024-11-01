"use client";

import { Calendar, ShoppingCart, LogOut, LayoutDashboard } from "lucide-react";
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

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
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
        window.location.href = "/";
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
];

export function AppSidebar() {
  const currentPath = usePathname();

  return (
    <Sidebar className>
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
