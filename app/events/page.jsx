"use client";
import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { Card, CardActions, CardContent, Typography, Button, CardMedia , Grid } from '@mui/material';
import Link from 'next/link';

export default function Events() {
     const events = []
      // {
    //         eventId: 1,
    //         eventName: "Kurushetra",
    //         description: "A symposium on the latest tech trends and innovations.",
    //         rollNo: "2022103012",
    //         contact: "48611481",
    //         organizerName: "Hariguru",
    //         domain: "Tech-ops",
    //         status: "upcoming",
    //         date: "2024-11-10",
    //         startTime: "10:00",
    //         endTime: "14:00",
    //     },
    //     {
    //         eventId: 2,
    //         eventName: "Vyuha",
    //         description: "Events for freshers",
    //         rollNo: "2022103025",
    //         contact: "846181154",
    //         organizerName: "Serva Ganeshu",
    //         domain: "Events",
    //         status: "past",
    //         date: "2024-10-29",
    //         startTime: "12:00",
    //         endTime: "16:00",
    //     },
    //     {
    //         eventId: 3,
    //         eventName: "Ctf projects",
    //         description: "An expo showcasing the project ideas in campus.",
    //         rollNo: "2022103013",
    //         contact: "7418226598",
    //         organizerName: "Visvesswar",
    //         domain: "Projects",
    //         status: "present",
    //         date: "2024-10-20",
    //         startTime: "09:00",
    //         endTime: "17:00",
    //     },
    //     {
    //         eventId: 4,
    //         eventName: "Open call",
    //         description: "Open call for juniors.",
    //         rollNo: "2022103535",
    //         contact: "9898745467",
    //         organizerName: "Kyle",
    //         domain: "HR",
    //         status: "past",
    //         date: "2024-12-05",
    //         startTime: "09:00",
    //         endTime: "15:00",
    //     },
    //     {
    //         eventId: 5,
    //         eventName: "Placeholder",
    //         description: "Actual placeholder event.",
    //         rollNo: "2022103502",
    //         contact: "567-890-1234",
    //         organizerName: "Dhino",
    //         domain: "Logistics",
    //         status: "upcoming",
    //         date: "2024-11-20",
    //         startTime: "10:00",
    //         endTime: "13:00",
    //     },
    // ];

    const [currentEvents, setCurrentEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [futureEvents, setFutureEvents] = useState([]);
    const [searchEvents, setSearchEvents] = useState("");

   

    useEffect(() => {

             async function fetchEvent()
        {
            try {
                const response = await fetch('http://localhost:3000/api/events');

                if(!response.ok){
                    throw new Error('Failed to fetch events');
                }

                const events = await response.json();

                setCurrentEvents(events);

            } catch (error) {
                console.error('Could not fetch events dino:',error);      
            }
        }
        fetchEvent();

        const filteredEvents = events.filter((event) => 
            event.eventName.toLowerCase().includes(searchEvents.toLowerCase())
        );
        const currentEvents = filteredEvents.filter((event) => event.status.toLowerCase() === "present");
        const pastEvents = filteredEvents.filter((event) => event.status.toLowerCase() === "past");
        const futureEvents = filteredEvents.filter((event) => event.status.toLowerCase() === "upcoming");

        setCurrentEvents(currentEvents);
        setPastEvents(pastEvents);
        setFutureEvents(futureEvents);
    }, [searchEvents]);


    return (
        <div className="bg-gray-500 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-black" style={{ fontFamily: 'cursive' }}>Events</h1>
            <Input 
                placeholder="Search Events" 
                onChange={(e) => setSearchEvents(e.target.value)} 
                className="mb-6 w-full"
            />

            {(currentEvents.length > 0 || pastEvents.length > 0 || futureEvents.length > 0) ? (
                <div>
                    <h1 className="text-xl font-semibold text-black mb-4">Current events</h1>
                    <Grid container spacing={2}>
                        {currentEvents.map((event) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={event.eventId}>
                                <Card className="border border-gray-300 rounded-lg shadow-md transition-transform duration-100 ease-in-out transform hover:scale-105 hover:shadow-lg">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="../assets/placeholder.jpg" 
                                        alt={event.eventName}
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
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <br />
                    <h1 className="text-xl font-semibold text-black mb-4">Past events</h1>
                    <Grid container spacing={2}>
                        {pastEvents.map((event) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={event.eventId}>
                                <Card className="border border-gray-300 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="../assets/placeholder.jpg" 
                                        alt={event.eventName}
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
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <br />
                    <h1 className="text-xl font-semibold text-black mb-4">Future events</h1>
                    <Grid container spacing={2}>
                        {futureEvents.map((event) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={event.eventId}>
                                <Card className="border border-gray-300 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="../assets/placeholder.jpg" 
                                        alt={event.eventName}
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
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : (
                <h1 className="text-center text-lg text-gray-600">Nope... no events recorded, registered, or upcoming</h1>
            )}
        </div>
    );
}
