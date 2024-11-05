import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Card({ event }) {
  return (
    <div className="w-72 transform rounded-lg bg-slate-100 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <CardMedia
        component="img"
        height="140"
        image="./assets/placeholder.jpg"
        alt={event.eventName}
        className="rounded-t-lg"
      />
      <CardContent>
        <Typography variant="h5" component="div" className="text-black">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description.substring(0, 60) + "..."}
        </Typography>
      </CardContent>
      <CardActions className="flex items-center justify-around">
        <Link href={`/events/${event.eventId}`} passHref>
          <Button size="small">Details</Button>
        </Link>
        <div
          className={`inline-block px-3 py-1 text-sm font-semibold capitalize ${
            event.status === "accepted"
              ? "bg-green-100 text-green-800"
              : event.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : event.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : event.status === "returned"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {event.status}
        </div>
      </CardActions>
    </div>
  );
}
