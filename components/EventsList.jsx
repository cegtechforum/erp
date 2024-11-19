"use client";
import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import Card from "./Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";

export default function EventsList({ events, name }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const statusCounts = events.reduce(
    (counts, event) => {
      counts[event.status] = (counts[event.status] || 0) + 1;
      return counts;
    },
    { pending: 0, accepted: 0, rejected: 0, returned: 0 }
  );

  const filteredEvents = events.filter((event) => {
    const matchesQuery =
      query.trim() === "" || event.eventName.toLowerCase().includes(query.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "all" || statusFilter === "" || event.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleXl = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("/api/events", {
        responseType: "blob",
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "events_report.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Download successful");
      } else {
        toast.error("Failed to generate the report");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Internal error occurred");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="w-4/5 flex items-center justify-between">
        <Select onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger className="w-[150px] bg-white border-none shadow-none font-semibold">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">{`All Events: ${events.length}`}</SelectItem>
            <SelectItem value="pending">{`Pending: ${statusCounts.pending}`}</SelectItem>
            <SelectItem value="accepted">{`Accepted: ${statusCounts.accepted}`}</SelectItem>
            <SelectItem value="rejected">{`Rejected: ${statusCounts.rejected}`}</SelectItem>
            <SelectItem value="returned">{`Returned: ${statusCounts.returned}`}</SelectItem>
          </SelectContent>
        </Select>

        <button
  onClick={handleXl}
  className={`flex items-center justify-center gap-2 bg-transparent text-white'} px-4 py-2 rounded-lg font-semibold shadow-md transition`}
  disabled={loading}
>
  {loading ? (
    <>
      <CircularProgress size={20} sx={{ color: "#000" }} /> 
      <span className="hidden md:block">Generating...</span>
    </>
  ) : (
    <>
      <DownloadIcon className={`block md:hidden text-black}`} />
      <span className="hidden md:block">Generate Report</span>
    </>
  )}
</button>

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
