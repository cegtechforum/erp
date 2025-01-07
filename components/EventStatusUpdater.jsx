"use client";
import { useState } from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EventStatusUpdater({
  eventId,
  initialStatus,
  isSuperUser,
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);

    try {
      const response = await axios.patch("/api/events", {
        eventId,
        status: newStatus,
      });

      if (response.status === 200) {
        toast.success("Status updated successfully");
        router.refresh();
      } else {
        toast.error(response.data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating the status.");
    }
  };
  if (!isSuperUser) return <Typography variant="body1">{status}</Typography>;

  return (
    <Select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      className="mt-2"
    >
      <MenuItem value="accepted">Accepted</MenuItem>
      <MenuItem value="pending">Pending</MenuItem>
      <MenuItem value="rejected">Rejected</MenuItem>
      <MenuItem value="returned">Returned</MenuItem>
    </Select>
  );
}
