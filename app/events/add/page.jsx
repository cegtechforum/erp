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
    list: [],
  };
  const [eventData, setEventData] = useState(initialState);
  const [itemName, setItemName] = useState("");
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState("");

  const addItem = (item_name, count, category) => {
    const newItem = { item_name: item_name, count: count, category: category };
    console.log(newItem, " is added to list");
    setEventData((prevData) => ({
      ...prevData,
      list: [...prevData.list, newItem],
    }));
    console.log(eventData.list);
    setItemName("");
    setCount(0);
    setCategory("");
  };

  const handleItemChange = (label, e) => {
    if (label === "ItemName") {
      setItemName(e.target.value);
    } else if (label === "Count") {
      setCount(e.target.value);
    } else if (label === "Category") {
      setCategory(e.target.value);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleRemove = (itemName) => {
    setEventData((prevData) => ({
      ...prevData,
      list: prevData.list.filter((item) => item.item_name !== itemName),
    }));
  };

  const handleSubmit = async (e) => {
    console.log(eventData);
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
                <Grid>
                  {
                    <div className="flex flex-row">
                      {/* Header Row */}
                      <p className="w-[33%] border bg-gray-300 p-2 text-center font-bold">
                        Item Name
                      </p>
                      <p className="w-[33%] border bg-gray-300 p-2 text-center font-bold">
                        Count
                      </p>
                      <p className="w-[33%] border bg-gray-300 p-2 text-center font-bold">
                        Category
                      </p>
                    </div>
                  }

                  {/* Dynamically Rendered Rows */}
                  {eventData.list && eventData.list.length > 0 ? (
                    eventData.list.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row border-b border-gray-200 hover:bg-gray-100"
                      >
                        <p className="w-[33%] p-2 text-center text-lg">
                          {item.item_name}
                        </p>
                        <p className="w-[33%] p-2 text-center text-lg">
                          {Number(item.count)}
                        </p>
                        <p className="w-[33%] p-2 text-center text-lg">
                          {item.category}
                        </p>
                        <button onClick={() => handleRemove(item.item_name)}>❌</button>
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-center text-gray-500">
                      No items added yet
                    </p>
                  )}

                  <Grid>
                    <TextField
                      fullWidth
                      name="itemName"
                      label="ItemName"
                      InputLabelProps={{ shrink: true }}
                      value={itemName}
                      onChange={(e) => handleItemChange("ItemName", e)}
                      
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      fullWidth
                      type="number"
                      name="count"
                      label="Count"
                      InputLabelProps={{ shrink: true }}
                      value={count}
                      onChange={(e) => handleItemChange("Count", e)}
                      
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      fullWidth
                      name="category"
                      label="Category"
                      InputLabelProps={{ shrink: true }}
                      value={category}
                      onChange={(e) => handleItemChange("Category", e)}
                      
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      itemName && count && category
                        ? addItem(itemName, count, category)
                        : toast.error("Fill all three fields to add item");
                    }}
                    sx={{ mt: 2 }}
                  >
                    Add Item
                  </Button>
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
