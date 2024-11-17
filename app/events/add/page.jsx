"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function EventForm() {
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

  const [list, setList] = useState([
    { itemName: "", count: "", category: "" },
  ]);

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
    <div className="overflow-hidden flex h-full min-h-screen" >
    <SidebarProvider>
    <AppSidebar />
    <main className=" overflow-hidden  h-full w-full" >
    <SidebarTrigger />
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">

    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create an Event</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(eventDetails).map((field) => (
          <input
            key={field}
            type={field.includes("Time") ? "time" : field === "date" ? "date" : "text"}
            name={field}
            value={eventDetails[field]}
            onChange={handleInputChange}
            placeholder={field}
            className="border border-gray-300 p-2 rounded-lg"
            required
          />
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        {list.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={item.itemName}
              onChange={(e) => handleListChange(index, e)}
              className="border border-gray-300 p-2 rounded-lg w-1/3"
              required
            />
            <input
              type="number"
              name="count"
              placeholder="Count"
              value={item.count}
              onChange={(e) => handleListChange(index, e)}
              className="border border-gray-300 p-2 rounded-lg w-1/3"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={item.category}
              onChange={(e) => handleListChange(index, e)}
              className="border border-gray-300 p-2 rounded-lg w-1/3"
              required
            />
            {list.length > 1 && (
              <button
                type="button"
                onClick={() => removeListItem(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addListItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Item
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold"
      >
        Submit Event
      </button>
    </form>
    </div>
    </main>
    </SidebarProvider>
    </div>
  );
}
