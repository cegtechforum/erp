"use client";

import { useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EventsList({ events, name }) {
  const [query, setQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [itemName, setItemName] = useState("");
  const [count, setCount] = useState("");
  const [category, setCategory] = useState("");

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(query.toLowerCase())
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
      category,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/lists", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Form submitted successfully!");
        setItemName("");
        setCount("");
        setCategory("");
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
          <SelectTrigger className="w-full bg-white border-none shadow-none font-semibold mb-4">
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
              <div className="p-2 text-center text-gray-500">No events found</div>
            )}
          </SelectContent>
        </Select>
      </div>

      {selectedEventId && (
        <form className="w-4/5 max-w-md p-4 border rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="itemName">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter item name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="count">
              Count
            </label>
            <input
              type="number"
              id="count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter count"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter category"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
