"use client";
import { useState, useEffect } from "react";
import {
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchEvents, setSearchEvents] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const filteredEvents =
    searchEvents !== ""
      ? events.filter((event) =>
          event.eventName.toLowerCase().includes(searchEvents.toLowerCase()),
        )
      : events;
  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get("/api/events");
        if (response.status !== 200) {
          throw new Error("Failed to fetch events");
        }
        setEvents(response.data.res);
      } catch (error) {
        console.error("Could not fetch events:", error);
      } finally {
        setisLoading(false);
      }
    }
    fetchEvent();
  }, []);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <CircularProgress size={100} />
      </div>
    );
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-100 p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-black">Events</h1>
      <input
        type="text"
        placeholder="Search Events"
        value={searchEvents}
        onChange={(e) => setSearchEvents(e.target.value)}
        className="mb-6 w-4/5 rounded-lg border border-gray-300 p-2"
      />

      {filteredEvents.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.eventId}
              className="w-full transform rounded-lg border border-gray-300 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4"
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
        <h1 className="text-center text-lg text-gray-600">
          Nope... no events recorded, registered, or upcoming
        </h1>
      )}
    </div>
  );
}
