"use client";

import { useState } from "react";
import Card from "./Card";
import CircularProgress from "@mui/material/CircularProgress";
import { ChevronDown, ChevronUp, Filter, X, Search } from "lucide-react";

export default function EventsList({ events, name, isSuperUser }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: [],
    domain: [],
  });
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const domains = [
    { value: "creativity & initiatives", label: "Creativity & Initiatives" },
    { value: "contents", label: "Contents" },
    { value: "design", label: "Design" },
    { value: "events", label: "Events" },
    { value: "finance", label: "Finance" },
    { value: "guest lectures", label: "Guest Lectures" },
    { value: "hospitality", label: "Hospitality" },
    { value: "human resources", label: "Human Resources" },
    { value: "industry relations", label: "Industry Relations" },
    { value: "internal auditing", label: "Internal Auditing" },
    { value: "logistics", label: "Logistics" },
    { value: "marketing & media", label: "Marketing & Media" },
    { value: "projects & research", label: "Projects & Research" },
    { value: "quality assurance & control", label: "Quality Assurance & Control" },
    { value: "techops", label: "Techops" },
    { value: "workshops", label: "Workshops" },
    { value: "xceed & karnival", label: "Xceed & Karnival" },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesQuery =
      query.trim() === "" ||
      event.eventName.toLowerCase().includes(query.trim().toLowerCase());

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(event.status);

    const matchesDomain =
      filters.domain.length === 0 || filters.domain.includes(event.domain);

    return matchesQuery && matchesStatus && matchesDomain;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const clearFilters = () => {
    setFilters({ status: [], domain: [] });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-black">{name}</h1>

      <div className="w-4/5 relative">
        <input
          type="text"
          placeholder="Search Events"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="mt-6 w-4/5">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg shadow-md"
        >
          <div className="flex items-center gap-2">
            <Filter className="text-gray-600" />
            <span className="font-semibold text-gray-800">
              {filters.status.length + filters.domain.length > 0
                ? `Filters (${filters.status.length + filters.domain.length})`
                : "Filters"}
            </span>
          </div>
          <ChevronDown className="text-gray-600" />
        </button>
      </div>

      {isFilterOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
    <div className="relative bg-white w-3/4 max-w-2xl p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto mt-16 md:mt-0">
      <button
        onClick={() => setIsFilterOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
      >
        <X className="h-6 w-6" />
      </button>
      <h3 className=" text-lg font-semibold text-gray-700 mb-3 flex justify-between items-center">Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-6">
        {[
          "pending",
          "accepted",
          "rejected",
          "returned",
        ].map((status) => (
          <label
            key={status}
            className="flex items-center cursor-pointer p-1"
          >
            <input
              type="checkbox"
              value={status}
              checked={filters.status.includes(status)}
              onChange={() => handleFilterChange("status", status)}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </label>
        ))}
      </div>

     {isSuperUser && <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Domains</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          {domains.map((domain) => (
            <label
              key={domain.value}
              className="inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value={domain.value}
                checked={filters.domain.includes(domain.value)}
                onChange={() => handleFilterChange("domain", domain.value)}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">{domain.label}</span>
            </label>
          ))}
        </div>
      </div>}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearFilters}
          className="px-4 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600"
        >
          Clear Filters
        </button>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
)}


      {filteredEvents.length > 0 ? (
        <div className="flex w-4/5 flex-wrap items-center justify-center gap-8 p-2">
          {filteredEvents.map((event) => (
            <Card event={event} key={event.eventId} />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-xl text-gray-500">No events found</p>
        </div>
      )}
    </div>
  );
}
