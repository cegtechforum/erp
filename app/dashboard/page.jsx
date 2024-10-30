"use client"
import { useState,useEffect } from "react";
import  Image  from 'next/image';
import { Button } from "antd";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import axios from 'axios';


export default function Dashboard(){

  
    const [events, setEvents] = useState([]);
   // const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get("/api/events");
          setEvents(response.data.events);
        } catch (err) {
          console.error("Error fetching events:", err);
          //setError("Failed to load events.");
        }
      };
  
      fetchEvents();
    }, []);

    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        setEvents(events)
    }, [])

    return(
        <div className="flex min-h-screen ">
        <SidebarProvider>
            <AppSidebar currentPath={currentPath} />
            <main className="w-full">
            <SidebarTrigger />
        <div className=" h-[calc(100vh-28px)] flex flex-col justify-center items-center text-center bg-gray-200" >
            <h1 className="p-5 text-center text-3xl w-4/5 font-bold" >Dashboard</h1>
            <div className=" text-center mb-5 mt-5 w-4/5">
                <input className="w-2/3 border border-sky-950 rounded-md text-center h-[2.25rem]"
                type="search"
                placeholder="search your events"
                />
            </div>
            <div className=" flex flex-col flex-grow w-full justify-center items-center gap-4">
               {events && events.length > 0 ? (events.map((event) => (
                <div  key={event.eventId} className="flex flex-col border border-teal-700 rounded-lg shadow-lg" >
                    <div className=" w2/3 p-2 flex flex-col items-center justify-center bg-white rounded-lg" >
                        <Image
                        className="rounded-lg"
                        src="/assets/placeholder.jpg"
                        alt={event.eventName}
                        width={200}
                        height={200}
                        />
                            <h2 className="font-bold text-2xl text-center " >{event.eventName}</h2>
                            <p className="pb-4 flex-wrap break-words" >{event.description}</p>
                            <Link href={`/events/${event.eventId}`} passHref>
                            <Button className="p-2 w-4/5 no-underline" >Details</Button>
                            </Link>
                        </div>
                    </div>
                ))):
                <p className="text-center text-xl font-bold">No events found</p>}
            </div>
        </div>
        </main>
        </SidebarProvider>
        </div>
    )
}