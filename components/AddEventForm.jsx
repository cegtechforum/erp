"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddEventForm() {
  const [eventDetails, setEventDetails] = useState({
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

  const [list, setList] = useState([{ itemName: "", count: "", category: "" }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (index, e) => {
    const { name, value } = e.target;
    setList((prev) => {
      const updatedList = [...prev];
      updatedList[index][name] = value;
      return updatedList;
    });
  };

  const handleDomainChange = (value) => {
    setEventDetails((prev) => ({ ...prev, domain: value }));
  };

  const addListItem = () => {
    setList((prev) => [...prev, { itemName: "", count: "", category: "" }]);
  };

  const removeListItem = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/events", {
        events: eventDetails,
        list,
      });

      if (response.status === 200) {
        toast.success("Event created successfully!");
        setEventDetails({
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
        setList([{ itemName: "", count: "", category: "" }]);
      } else {
        toast.error("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("An error occurred while creating the event.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">Create an Event</h1>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {Object.keys(eventDetails).map((field) =>
          field === "domain" ? (
            <div
              key={field}
              className="flex flex-col items-center justify-center"
            >
              <label htmlFor="domain" className="w-full">
                Domain
              </label>
              <Select onValueChange={handleDomainChange}>
                <SelectTrigger className="w-full border border-gray-300 bg-white">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="creativity & initiatives">
                    Creativity & Initiatives
                  </SelectItem>
                  {/* Add remaining options */}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div key={field} className="flex flex-col">
              <label htmlFor={field}>
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type={
                  field.includes("Time")
                    ? "time"
                    : field === "date"
                      ? "date"
                      : "text"
                }
                name={field}
                value={eventDetails[field]}
                onChange={handleInputChange}
                placeholder={field}
                className="rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
          ),
        )}
      </div>

      <div className="mt-4">
        <h2 className="mb-2 text-xl font-semibold">Items</h2>
        {list.map((item, index) => (
          <div
            key={index}
            className="mb-4 flex flex-col gap-4 rounded-lg border border-gray-300 p-4 lg:flex-row lg:gap-2"
          >
            <div className="flex w-full flex-col">
              <label htmlFor="itemName" className="flex">
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={item.itemName}
                onChange={(e) => handleListChange(index, e)}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="count" className="flex">
                Count
              </label>
              <input
                type="number"
                name="count"
                placeholder="Count"
                value={item.count}
                onChange={(e) => handleListChange(index, e)}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={item.category}
                onChange={(e) => handleListChange(index, e)}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
            {list.length > 1 && (
              <button
                type="button"
                onClick={() => removeListItem(index)}
                className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white lg:mt-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addListItem}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Add Item
        </button>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-green-500 px-6 py-3 font-bold text-white"
      >
        Submit Event
      </button>
    </form>
  );
}
