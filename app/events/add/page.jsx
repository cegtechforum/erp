"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"


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

  const handleDomainChange = (value) => {
    setEventDetails((prev) => ({...prev,domain:value}));
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 p-6">

    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create an Event</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {Object.keys(eventDetails).map((field) => 
        field === "domain" ? (
          <div key={field} className="flex items-center justify-center flex-col" >
            <label htmlFor="domain"className="w-full" >Domain</label>
            <Select onChange={handleDomainChange} >
              <SelectTrigger className="w-full bg-white border border-gray-300">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent className="bg-white" >
                <SelectItem value="creativity & initiatives">Creativity & Initiatives</SelectItem>
                <SelectItem value="contents">Contents</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="guest lectures">Guest Lectures</SelectItem>
                <SelectItem value="hospitality">Hospitality</SelectItem>
                <SelectItem value="human resources">Human Resources</SelectItem>
                <SelectItem value="industry relations">Industry Relations</SelectItem>
                <SelectItem value="internal auditing">Internal Auditing</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="marketing & media">Marketing & Media</SelectItem>
                <SelectItem value="projects & research">Projects & Research</SelectItem>
                <SelectItem value="quality assurance & control">Quality Assurance & Control</SelectItem>
                <SelectItem value="techops">Techops</SelectItem>
                <SelectItem value="workshops">Workshops</SelectItem>
                <SelectItem value="xceed & karnival">Xceed & Karnival</SelectItem>
              </SelectContent>
          </Select>
          </div> ) : (
          <div key={field}  className="flex flex-col">
            <label htmlFor={field}>{field
              .replace(/([A-Z])/g," $1")
              .replace(/^./,(str)=>str.toUpperCase())}</label>
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
          </div>
        ))}
      </div>

      <div className="mt-4">
  <h2 className="text-xl font-semibold mb-2">Items</h2>
  {list.map((item, index) => (
    <div 
      key={index} 
      className="flex flex-col gap-4 mb-4 p-4 border border-gray-300 rounded-lg lg:flex-row lg:gap-2"
    >
      <div className="flex flex-col w-full">
        <label htmlFor="itemName" className="flex">Item Name</label>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={item.itemName}
          onChange={(e) => handleListChange(index, e)}
          className="border border-gray-300 p-2 rounded-lg w-full"
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="count" className="flex">Count</label>
        <input
          type="number"
          name="count"
          placeholder="Count"
          value={item.count}
          onChange={(e) => handleListChange(index, e)}
          className="border border-gray-300 p-2 rounded-lg w-full"
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={item.category}
          onChange={(e) => handleListChange(index, e)}
          className="border border-gray-300 p-2 rounded-lg w-full"
          required
        />
      </div>
      {list.length > 1 && (
        <button
          type="button"
          onClick={() => removeListItem(index)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg lg:mt-0 mt-4"
        >
          Remove
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={addListItem}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
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
