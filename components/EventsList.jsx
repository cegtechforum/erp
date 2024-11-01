"use client";

import { useState } from "react";
import Card from "./Card";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"


export default function EventsList({ events, name }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusCounts = events.reduce(
    (counts, event) => {
      counts[event.status] = (counts[event.status] || 0) + 1;
      return counts;
    },
    { pending: 0, accepted: 0, rejected: 0, returned: 0 }
  );

  const filteredEvents = events.filter((event) => {
    const matchesQuery = query.trim() === "" || event.eventName.toLowerCase().includes(query.trim().toLowerCase());
    const matchesStatus = statusFilter === "all" || statusFilter ==="" || event.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

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
      <div className="w-4/5 justify-start" >
      <Select onValueChange ={(value)=>setStatusFilter(value)}>
                <SelectTrigger className="w-[150px] bg-white border-none shadow-none font-semibold mb-4">
                  <SelectValue placeholder={`Status`} />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem  value="all">{`All Events: ${events.length}`}</SelectItem>
                  <SelectItem  value="pending">{`Pending: ${statusCounts.pending}`}</SelectItem>
                  <SelectItem value="accepted">{`Accepted: ${statusCounts.accepted}`}</SelectItem>
                  <SelectItem value="rejected">{`Rejected: ${statusCounts.rejected}`}</SelectItem>
                  <SelectItem value="returned">{`Returned: ${statusCounts.returned}`}</SelectItem>
                </SelectContent>
      </Select>
      </div>
     
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
