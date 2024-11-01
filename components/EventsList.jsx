"use client";

import { useState } from "react";
import Card from "./Card";

export default function EventsList({ events, name }) {
  const [query, setQuery] = useState("");
  const filteredEvents = query.trim()
    ? events.filter((event) =>
        event.eventName.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : events;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-black">{name}</h1>
      <input
        type="text"
        placeholder="Search Events"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-4/5 rounded-lg border border-slate-100 p-2"
      />
      {filteredEvents.length > 0 ? (
        <div className="flex w-4/5 flex-wrap items-center justify-center gap-8 p-2">
          {filteredEvents.map((event) => (
            <Card event={event} key={event.eventId} />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg text-gray-900">No events found</h1>
      )}
    </div>
  );
}
