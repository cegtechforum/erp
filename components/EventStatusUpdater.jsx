"use client";
import { useState } from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import axios from "axios";

export default function EventStatusUpdater({
  eventId,
  initialStatus,
  isSuperUser,
}) {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);

    try {
      const response = await axios.patch("/api/events", {
        eventId,
        status: newStatus,
      });

      if (response.status === 200) {
        alert("Status updated successfully");
      } else {
        alert(response.data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status.");
    }
  };
  console.log(isSuperUser);
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
