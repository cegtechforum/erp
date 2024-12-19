import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { Download as DownloadIcon } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Card({ event }) {
  const [loading, setLoading] = useState(false);

  const handleXl = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/events?eventId=${event.eventId}`, {
        responseType: "blob",
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${event.eventName}_report.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Download successful");
      } else {
        toast.error("Failed to generate the report");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Internal error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-72 transform rounded-lg bg-slate-50 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <CardMedia
          component="img"
          height="140"
          image={event.posterUrl || "/assets/placeholder.jpg"}
          alt={event.eventName}
          className="rounded-t-lg"
        />
        <Tooltip title={`Event ${event.eventName} Report`} arrow>
          <button
            onClick={handleXl}
            className={`absolute right-1 top-1 flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-1 font-semibold text-black shadow-md transition hover:bg-green-500`}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "#000" }} />
            ) : (
              <DownloadIcon />
            )}
          </button>
        </Tooltip>
      </div>
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
