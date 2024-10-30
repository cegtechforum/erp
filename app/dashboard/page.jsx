"use client"
import { useState,useEffect } from "react";
import  Image  from 'next/image';
import { Button } from "antd";

export default function Dashboard(){

  
        const event = [{
            eventId: 1,
            eventName: "Kurushetra",
            description: "A symposium on the latest tech trends and innovations.",
            rollNo: "2022103012",
            contact: "48611481",
            organizerName: "Hariguru",
            domain: "Tech-ops",
            status: "upcoming",
            date: "2024-11-10",
            startTime: "10:00",
            endTime: "14:00",
        },
        {
            eventId: 2,
            eventName: "Kurushetra",
            description: "A symposium on the latest tech trends and innovations.",
            rollNo: "2022103012",
            contact: "48611481",
            organizerName: "Hariguru",
            domain: "Tech-ops",
            status: "upcoming",
            date: "2024-11-10",
            startTime: "10:00",
            endTime: "14:00",
        },];

    //get the events from the server

    
    const[events,setEvents] = useState([])

    useEffect(() => {
        // fetch events from server 
        setEvents(event)
    }, [])

    return(
        <div className=" h-screen flex flex-col justify-center items-center text-center " >
            <h1 className="p-5 text-center text-3xl w-4/5 font-bold" >Dashboard</h1>
            <div className=" text-center mb-5 mt-5 w-4/5">
                <input className="w-2/3 border border-sky-950 rounded-md text-center h-[2.25rem]"
                type="search"
                placeholder="search your events"
                //value={searchEvents}
                />
            </div>
            {/* this is the card component*/}
            <div className=" flex md:flex-row flex-col flex-grow w-full justify-center items-center gap-4">
                {events.map((event) => (
                <div  key={event.eventId} className="w-64 lg:w-80  group flex flex-col justify-center text-center border border-teal-700 rounded-lg shadow-lg " >
                    <div className=" w-full p-2 flex flex-col items-center justify-center bg-white rounded-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out" >
                        <Image
                        className="rounded-lg"
                        src="/assets/placeholder.jpg"
                        alt={event.eventName}
                        width={200}
                        height={200}
                        />
                            <h2 className="font-bold text-2xl text-center " >{event.eventName}</h2>
                            <p className="pb-4 flex-wrap break-words" >{event.description}</p>
                            <Button className="p-2 w-4/5" >Details</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}