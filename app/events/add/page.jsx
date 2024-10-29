// components/AddEventForm.js
"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

export default function AddEventForm() {
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    rollNo: "",
    contact: "",
    organizerName: "",
    domain: "",
    date: "",
    startTime: "",
    endTime: "",
  });
   
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      const result = await response.json();
      console.log("Event added successfully:", result);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Add New Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="eventName"
                label="Event Name"
                value={eventData.eventName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                value={eventData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="rollNo"
                label="Roll No"
                value={eventData.rollNo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="contact"
                label="Contact"
                value={eventData.contact}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="organizerName"
                label="Organizer Name"
                value={eventData.organizerName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="domain"
                label="Domain"
                value={eventData.domain}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                name="date"
                label="Event Date"
                InputLabelProps={{ shrink: true }}
                value={eventData.date}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type="time"
                name="startTime"
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                value={eventData.startTime}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type="time"
                name="endTime"
                label="End Time"
                InputLabelProps={{ shrink: true }}
                value={eventData.endTime}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
