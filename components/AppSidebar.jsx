"use client";
import {
  Calendar,
  ShoppingCart,
  LogOut,
  LayoutDashboard,
  Plus,
  Presentation,
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

export function AppSidebar({ isSuperUser, domain, email }) {
  const currentPath = usePathname();

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
    ...(isSuperUser
      ? [
          {
            title: "Items",
            url: "/items",
            icon: ShoppingCart,
          },
        ]
      : []),
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
      <SidebarContent className="flex">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-xl font-bold">
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
                        <Link
                          href={item.url}
                          className={`!rounded-none transition-colors duration-100 hover:!rounded-md hover:bg-gray-100 hover:text-gray-800 ${
                            isActive
                              ? "bg-gray-400 text-black"
                              : "text-gray-400"
                          }`}
                        >
                          <div className={`flex w-full items-center p-4`}>
                            <item.icon />
                            <span className="ml-2 w-full text-lg">
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className={`flex items-center transition-colors duration-200 ${
                            isActive
                              ? "bg-gray-300 text-black"
                              : "text-gray-400"
                          } hover:!bg-red-600 hover:text-red-100`}
                        >
                          <item.icon className="ml-4" />
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
        <p className="mt-auto px-2 text-base font-semibold text-gray-400">
          {email}
        </p>
        <p className="mb-2 px-2 pb-2 text-base font-bold uppercase text-gray-400">
          {domain}
        </p>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
