"use client";
import { useState, useEffect } from 'react';
import {  CardActions, CardContent, Typography, Button, CardMedia } from '@mui/material';
import Link from 'next/link';

export default function Events() {


        const [events,setEvents] = useState([]);


    const [searchEvents, setSearchEvents] = useState("");
    const filteredEvents = searchEvents!="" ? events.filter((event) => 
    event.eventName.toLowerCase().includes(searchEvents.toLowerCase())) : events ;
  
    useEffect(() => {

             async function fetchEvent()    
        {
            try {
                const response = await fetch('http://localhost:3000/api/events');

                if(!response.ok){
                    throw new Error('Failed to fetch events');
                }

                const events = await response.json();

                setEvents(events);

            } catch (error) {
                console.error('Could not fetch events:',error);      
            }
        }
        fetchEvent();



    }, []);


    return (
        <div className="bg-gray-500 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-black" style={{ fontFamily: 'cursive' }}>Events</h1>
            <input 
                type="text" 
                placeholder="Search Events" 
                value={searchEvents} 
                onChange={(e) => setSearchEvents(e.target.value)} 
                className="mb-6 w-full p-2 rounded-lg border border-gray-300"
            />

{filteredEvents.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-center">
                    {filteredEvents.map((event) => (
                        <div 
                            key={event.eventId} 
                            className="border border-gray-300 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image="../assets/placeholder.jpg" 
                                alt={event.eventName}
                                className="rounded-t-lg"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div" className="text-black">
                                    {event.eventName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {event.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={`/events/${event.eventId}`} passHref>
                                    <Button size="small">Details</Button>
                                </Link>
                            </CardActions>
                        </div>
                    ))}
                </div>
            ) : (
                <h1 className="text-center text-lg text-gray-600">Nope... no events recorded, registered, or upcoming</h1>
            )}
        </div>
    );
}
