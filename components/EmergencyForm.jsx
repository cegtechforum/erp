"use client";

import { useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventsList({ events, name }) {
  const [query, setQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [itemName, setItemName] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(query.toLowerCase()),
  );

  // Handle form submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEventId) {
      alert("Please select an event first.");
      return;
    }

    const formData = {
      eventId: selectedEventId,
      itemName,
      count: parseInt(count, 10),
      description,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/lists",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        alert("Form submitted successfully!");
        setItemName("");
        setCount("");
        setDescription("");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-black">{name}</h1>

      <div className="w-4/5 justify-start">
        <Select onValueChange={(value) => setSelectedEventId(value)}>
          <SelectTrigger className="mb-4 w-full border-none bg-white font-semibold shadow-none">
            <SelectValue placeholder="Select an Event" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search Events"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-2 w-full rounded-lg border border-slate-100 p-2"
              />
            </div>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <SelectItem key={event.eventId} value={event.eventId}>
                  {event.eventName}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">
                No events found
              </div>
            )}
          </SelectContent>
        </Select>
      </div>

      {selectedEventId && (
        <form
          className="w-4/5 max-w-md rounded-lg border p-4 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="mb-2 block font-semibold text-gray-700"
              htmlFor="itemName"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full rounded-lg border p-2 focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Enter item name"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-semibold text-gray-700"
              htmlFor="count"
            >
              Count
            </label>
            <input
              type="number"
              id="count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full rounded-lg border p-2 focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Enter count"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-semibold text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border p-2 focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Enter description"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
