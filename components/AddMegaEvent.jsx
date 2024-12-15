"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function AddMegaEventForm() {
  const [newMegaEvent, setNewMegaEvent] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMegaEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMegaEvent.name || !newMegaEvent.description) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/megaevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMegaEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to create mega-event.");
      }

      toast.success("Mega-event created successfully!");
      setNewMegaEvent({ name: "", description: "" });
    } catch (error) {
      console.error("Error adding mega-event:", error);
      toast.error("Failed to create mega-event.");
    }
  };

  return (
    <Box
      sx={{
        mt: "50px",
        maxWidth: "900px", 
        mx: "auto", // Centers the form horizontally
        width: "100%", // Full width on small screens
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Create Mega Event
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Mega Event Name"
            name="name"
            value={newMegaEvent.name}
            onChange={handleInputChange}
            variant="outlined"
            sx={{
              width: "100%", // Ensures full width
            }}
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newMegaEvent.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
            sx={{
              width: "100%", // Ensures full width
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "100%", // Full-width button
          }}
        >
          Create Event
        </Button>
      </form>
    </Box>
  );
}
