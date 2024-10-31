"use client";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const EventDetails = ({ params }) => {
  const [event, setEvent] = useState({});
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setisLoading(true);
        const response = await axios.get(`/api/events/${params.eventId}`);
        if (response.data.status !== 200) {
          throw new Error(response.data.error);
        }
        setEvent(response.data.res);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setisLoading(false);
      }
    };

    fetchEvent();
  }, [params.eventId]);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <CircularProgress size={100} />
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <Card className="my-4 w-4/5 max-w-4xl rounded-lg border border-gray-300 shadow-lg shadow-gray-400">
        <CardMedia
          component="img"
          height="140"
          image="../assets/kurukshetra.jpg"
          alt={event.eventName}
          className="rounded-t-lg"
        />
        <CardContent className="text-center">
          <div className="mb-4">
            <Typography
              variant="h5"
              component="div"
              className="mb-1 font-bold text-black"
            >
              {event.eventName}
            </Typography>
            <Typography
              variant="body2"
              className="mx-auto max-w-2xl"
              color="text.secondary"
            >
              {event.description}
            </Typography>
          </div>
          <hr className="mb-4 border-gray-500" />

          <div className="mb-4">
            <Typography variant="h6" className="mb-2 font-bold">
              Event Details
            </Typography>
            <Typography variant="body2" className="mb-1 text-gray-700">
              <strong>Status:</strong> {event.status}
            </Typography>
            <Typography variant="body2" className="mb-1 text-gray-700">
              <strong>Date:</strong> {event.date}
            </Typography>
            <Typography variant="body2" className="mb-1 text-gray-700">
              <strong>Time:</strong> {event.startTime} - {event.endTime}
            </Typography>
          </div>
          <hr className="mb-4 border-gray-500" />

          <div>
            <Typography variant="h6" className="mb-2 font-bold">
              Organizer Information
            </Typography>
            <Typography
              variant="body2"
              className="mb-1 capitalize text-gray-700"
            >
              <strong>Name:</strong> {event.organizerName}
            </Typography>
            <Typography variant="body2" className="mb-1 text-gray-700">
              <strong>Roll No:</strong> {event.rollNo}
            </Typography>
            <Typography
              variant="body2"
              className="mb-1 uppercase text-gray-700"
            >
              <strong>Domain:</strong> {event.domain}
            </Typography>
            <Typography variant="body2" className="mb-1 text-gray-700">
              <strong>Contact:</strong> {event.contact}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;
