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
import axios from "axios";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import toast from "react-hot-toast";

export default function AddEventForm() {
  const initialState = {
    eventName: "",
    description: "",
    rollNo: "",
    contact: "",
    organizerName: "",
    domain: "",
    date: "",
    startTime: "",
    endTime: "",
  };
  const [eventData, setEventData] = useState(initialState);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/events", { events: eventData });
      if (response.data.status !== 200) {
        throw new Error(response.data.error);
      }
      eventData;
      toast.success("Added Successfully");
      setEventData(initialState);
    } catch (error) {
      toast.error(error.message || "Error occured");
    }
  };

  return (
    <div className="flex h-full min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="h-full w-full">
          <SidebarTrigger />
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
        </main>
      </SidebarProvider>
    </div>
  );
}
