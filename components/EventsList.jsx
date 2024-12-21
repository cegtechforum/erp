"use client";
import { useState } from "react";
import Card from "./Card";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Search,
  DownloadIcon,
} from "lucide-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import toast from "react-hot-toast";

export default function EventsList({ events, name, isSuperUser, megaEvents }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: [],
    domain: [],
  });
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  console.log(isSuperUser);
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
    {
      value: "quality assurance & control",
      label: "Quality Assurance & Control",
    },
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
        link.setAttribute("download", "full_events_report.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Report Generated");
      } else {
        toast.error("Failed to generate the report");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ status: [], domain: [] });
  };
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-black">{name}</h1>

      <div className="relative w-4/5">
        <input
          type="text"
          placeholder="Search Events"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
      </div>
      <div className="my-4 flex w-4/5 justify-between gap-6">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex w-60 items-center justify-between rounded-lg bg-gray-100 p-3 shadow-md transition-colors hover:bg-gray-200"
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
        {isSuperUser && (
          <button
            onClick={handleXl}
            disabled={loading}
            className="flex w-60 items-center justify-center rounded-sm bg-green-500 font-semibold text-green-100 hover:bg-green-600"
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: "#fff" }} />
                <span className="ml-4 hidden md:block">Generating...</span>
              </>
            ) : (
              <>
                <DownloadIcon className={`block md:hidden`} />
                <span className="hidden md:block">Generate Excel</span>
              </>
            )}
          </button>
        )}
      </div>


      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="relative mt-16 max-h-[80vh] w-3/4 max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg md:mt-0">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="absolute right-4 top-4 text-gray-600 hover:text-red-600"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="mb-3 flex items-center justify-between text-lg font-semibold text-gray-700">
              Status
            </h3>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {["pending", "accepted", "rejected", "returned"].map((status) => (
                <label
                  key={status}
                  className="flex cursor-pointer items-center p-1"
                >
                  <input
                    type="checkbox"
                    value={status}
                    checked={filters.status.includes(status)}
                    onChange={() => handleFilterChange("status", status)}
                    className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </label>
              ))}
            </div>

            {isSuperUser && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-700">
                  Domains
                </h3>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2">
                  {domains.map((domain) => (
                    <label
                      key={domain.value}
                      className="inline-flex cursor-pointer items-center"
                    >
                      <input
                        type="checkbox"
                        value={domain.value}
                        checked={filters.domain.includes(domain.value)}
                        onChange={() =>
                          handleFilterChange("domain", domain.value)
                        }
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{domain.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={clearFilters}
                className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {name === "Events" && megaEvents.length > 0 ? (
        <div className="w-4/5">
          {megaEvents.map((megaEventItem) => (
            <Accordion key={megaEventItem.id}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>{megaEventItem.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {filteredEvents.length > 0 ? (
                    <div className="flex w-full flex-wrap items-center justify-center gap-8 p-2">
                      {filteredEvents
                        .filter(
                          (event) => event.megaeventId === megaEventItem.id,
                        )
                        .map((event) => (
                          <Card event={event} key={event.eventId} />
                        ))}
                    </div>
                  ) : (
                    <div className="mt-10 text-center">
                      <p className="text-xl text-gray-500">No events found</p>
                    </div>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ) : (
        <div>
          {filteredEvents.length > 0 ? (
            <div className="flex w-full flex-wrap items-center justify-center gap-8 p-2">
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
      )}
    </div>
  );
}
