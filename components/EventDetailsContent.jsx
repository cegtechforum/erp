"use client"
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import EventStatusUpdater from "@/components/EventStatusUpdater";
import GoBackButton from "./GoBackButton";
import AddRequestButton from "./AddRequestButton";
import { useMediaQuery } from "@mui/material";

export default function EventDetailsContent({ event, items, isSuperUser }) {
  const isMobile = useMediaQuery("(max-width: 600px)"); // Detect mobile screen
  const isMediumScreen = useMediaQuery("(min-width: 600px) and (max-width: 1200px)"); // Detect medium screens

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-medium capitalize text-red-600">
        Event not found
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <GoBackButton />
      <Card className="hover:shadow-3xl my-6 w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 shadow-2xl transition-transform duration-300">
        <div className="relative">
          <CardMedia
            component="img"
            height="280"
            image="/assets/thorfinn.jpg"
            alt={event.eventName}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <Typography variant="h3">
            <p className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
              {event.eventName}
            </p>
          </Typography>
        </div>
        <CardContent className="bg-white p-8">
          <div className="mb-8 text-center">
            <Typography variant="body1" color="text.secondary">
              <span className="mb-4 text-lg text-gray-600">{event.description}</span>
            </Typography>
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="mb-6 space-y-4">
            <Typography variant="h5">
              <span className="font-semibold text-gray-800">Event Details</span>
            </Typography>
            <div className="flex items-center justify-between capitalize">
              <Typography variant="body1" className="text-gray-600">
                <strong>Status:</strong>
              </Typography>
              <EventStatusUpdater
                eventId={event.eventId}
                initialStatus={event.status}
                isSuperUser={isSuperUser}
              />
            </div>
            <EventDetailRow label="Date:" value={event.date} />
            <EventDetailRow label="Time:" value={`${event.startTime} - ${event.endTime}`} />
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="space-y-4">
            <Typography variant="h5">
              <span className="font-semibold text-gray-800">Organizer Information</span>
            </Typography>
            <EventDetailRow label="Name:" value={event.organizerName} />
            <EventDetailRow label="Roll No:" value={event.rollNo} />
            <EventDetailRow label="Domain:" value={event.domain} />
            <EventDetailRow label="Contact:" value={event.contact} />
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="flex flex-col w-full">
            <div className="space-y-4">
            <div className="flex items-center gap-4 font-semibold text-gray-700 capitalize">
                <Typography
                  variant={isMobile ? "body1" : isMediumScreen ? "h6" : "h5"}
                  className="flex-1 text-left"
                >
                  <span className="font-semibold text-gray-800">Items</span>
                </Typography>
                <Typography
                  variant={isMobile ? "body1" : isMediumScreen ? "h6" : "h5"}
                  className="flex-1 text-center"
                >
                  <span className="font-semibold text-gray-800">Accepted</span>
                </Typography>
                <Typography
                  variant={isMobile ? "body1" : isMediumScreen ? "h6" : "h5"}
                  className="flex-1 text-right"
                >
                  <span className="font-semibold text-gray-800">Pending</span>
                </Typography>
              </div>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <EventDetailRow
                    key={index}
                    label={item.itemName}
                    value={item.count}
                    approvedCount={item.approvedCount}
                  />
                ))
              ) : (
                <Typography variant="body1" className="text-gray-500">
                  No items found.
                </Typography>
              )}
            </div>
            <div className="flex items-center justify-center">
              <AddRequestButton event={event} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const EventDetailRow = ({ label, value, approvedCount }) => {
  const isMobile = useMediaQuery("(max-width: 600px)"); // Detect mobile screen
  
  return (
    <div className="flex items-center justify-between gap-4 capitalize">
      <Typography variant={isMobile ? "body2" : "body1"} className="flex-1">
        <span className="font-black text-gray-700">{label}</span>
      </Typography>
      {approvedCount !== undefined && (
        <Typography variant={isMobile ? "body2" : "body1"} className="flex-1 flex items-center justify-center text-center">
          <span className="font-medium text-gray-500">{approvedCount}</span>
        </Typography>
      )}
      <Typography variant={isMobile ? "body2" : "body1"} className="flex-1 text-right">
        <span className="font-medium text-gray-500">{value}</span>
      </Typography>
    </div>
  );
};
