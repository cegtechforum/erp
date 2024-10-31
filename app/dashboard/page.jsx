"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import axios from "axios";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [query, setQuery] = useState("");
  const currentPath = usePathname();

  const filteredEvents =
    query.trim() !== ""
      ? events.filter((event) =>
          event.eventName.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : events;
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        if (response.data.status !== 200) {
          throw new Error(response.data.error);
        }
        setEvents(response.data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setisLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <CircularProgress size={100} />
      </div>
    );

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar currentPath={currentPath} />
        <main className="w-full">
          <SidebarTrigger />
          <div className="flex h-[calc(100vh-28px)] flex-col items-center justify-center bg-gray-200 text-center">
            <h1 className="w-4/5 p-5 text-center text-3xl font-bold">
              Dashboard
            </h1>
            <div className="mb-5 mt-5 w-4/5 text-center">
              <input
                className="h-[2.25rem] w-2/3 rounded-lg border border-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your events"
              />
            </div>
            <div className="flex w-full flex-grow flex-col items-center justify-center gap-4 md:flex-row">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.eventId}
                    className="flex w-72 flex-col rounded-lg bg-gray-400 p-2 shadow-md shadow-gray-400 transition-transform duration-150 ease-in-out hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-2">
                      <Image
                        className="rounded-lg"
                        src="/assets/placeholder.jpg"
                        alt={event.eventName}
                        width={200}
                        height={200}
                      />
                      <h2 className="my-2 text-center text-2xl font-bold">
                        {event.eventName}
                      </h2>
                      <p className="flex-wrap break-words pb-4 text-sm">
                        {event.description.substring(0, 50) + "..."}
                      </p>
                      <div className="flex w-full items-center justify-around gap-4">
                        <p className="rounded-lg px-4 py-1 font-semibold capitalize text-emerald-600">
                          {event.status}
                        </p>
                        <Link
                          href={`/events/${event.eventId}`}
                          className="rounded-lg bg-blue-500 px-4 py-1 font-semibold text-white hover:bg-blue-700 active:ring-2 active:ring-offset-2"
                          passHref
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xl font-bold">No events found</p>
              )}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
