import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { eq } from "drizzle-orm";
import { db } from "@/app/_lib/db";
import { events } from "@/app/_db/schema";

export async function EventDetails({ params }) {
  const { eventId } = params;

  const res = await db
    .select()
    .from(events)
    .where(eq(events.eventId, Number(eventId)));

  const event = res[0];

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-medium capitalize text-red-600">
        Event not found
      </div>
    );
  }

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
}

export default EventDetails;
