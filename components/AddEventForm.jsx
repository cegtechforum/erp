"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import OptionSelectionDialog from "./selectOption";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RxCrossCircled } from "react-icons/rx";
import ImageUploader from "./ImageUploader";

export default function AddEventForm({
  isSuperUser,
  domain,
  megaEvents,
  items,
}) {
  const [megaEventName, setMegaEventName] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Track if the item list is visible
  const [selectedItem, setSelectedItem] = useState("");
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    description: "",
    megaeventId: null,
    rollNo: "",
    contact: "",
    organizerName: "",
    domain: domain,
    posterUrl: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [list, setList] = useState([
    {
      itemName: "",
      count: "",
      description: "",
    },
  ]);
  const imageUploaderRef = useRef(null);

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
    setList((prev) => [...prev, { itemName: "", count: "", description: "" }]);
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
        if (imageUploaderRef.current) {
          imageUploaderRef.current.resetImage();
        }
        setEventDetails({
          eventName: "",
          description: "",
          megaeventId: "",
          rollNo: "",
          contact: "",
          organizerName: "",
          domain: "",
          posterUrl: "",
          date: "",
          startTime: "",
          endTime: "",
        });
        setList([{ itemName: "", count: "", description: "" }]);
      } else {
        toast.error("Failed to create event.");
      }
    } catch (error) {
      console.log("Error creating event:", error);
      toast.error("An error occurred while creating the event.");
    }
  };

  const isAddButtonDisabled = list.some(
    (item) => !item.itemName || !item.count || !item.description,
  );

  const handleEventFamilyChange = (value) => {
    const selectedEvent = megaEvents.find((event) => event.name === value);
    if (selectedEvent) {
      setEventDetails((prev) => ({ ...prev, megaeventId: selectedEvent.id }));
      setMegaEventName(value);
    } else {
      setEventDetails((prev) => ({ ...prev, megaeventId: "" }));
      setMegaEventName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <ImageUploader setEventDetails={setEventDetails} ref={imageUploaderRef} />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {Object.keys(eventDetails).map((field, index) =>
          field === "domain" ? (
            <div
              key={`${field}-${index}`}
              className="flex flex-col items-center justify-center"
            >
              <label htmlFor="domain" className="w-full">
                Domain
              </label>
              <Select
                onValueChange={handleDomainChange}
                disabled={!isSuperUser}
                value={eventDetails.domain}
              >
                <SelectTrigger className="w-full border border-gray-300 bg-white">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="creativity & initiatives">
                    Creativity & Initiatives
                  </SelectItem>
                  <SelectItem value="contents">Contents</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="guest lectures">Guest Lectures</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="human resources">
                    Human Resources
                  </SelectItem>
                  <SelectItem value="industry relations">
                    Industry Relations
                  </SelectItem>
                  <SelectItem value="internal auditing">
                    Internal Auditing
                  </SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="marketing & media">
                    Marketing & Media
                  </SelectItem>
                  <SelectItem value="projects & research">
                    Projects & Research
                  </SelectItem>
                  <SelectItem value="quality assurance & control">
                    Quality Assurance & Control
                  </SelectItem>
                  <SelectItem value="techops">Techops</SelectItem>
                  <SelectItem value="workshops">Workshops</SelectItem>
                  <SelectItem value="xceed & karnival">
                    Xceed & Karnival
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : field === "posterUrl" ? null : field === "megaeventId" ? (
            <div className="flex flex-col">
              <label htmlFor="eventFamily" className="w-full">
                Event Family
              </label>
              <Select
                onValueChange={handleEventFamilyChange}
                value={megaEventName}
              >
                <SelectTrigger className="w-full border border-gray-300 bg-white">
                  <SelectValue placeholder="Select Event Family" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                <SelectItem value={null}>
                      Select MegaEvents
                    </SelectItem>
                  {megaEvents.map((event) => (
                    <SelectItem key={event.id} value={event.name}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div key={`${field}-${index}`} className="flex flex-col">
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
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
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
            key={`${item.name}-${index}`}
            className="relative mb-4 flex flex-col items-center gap-4 rounded-lg border border-gray-300 p-4 lg:flex-row lg:gap-2"
          >
            <div className="flex w-full flex-col">
              <label htmlFor="itemName" className="flex">
                Item Name
              </label>
              <div
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                className="cursor-pointer rounded-lg border bg-gray-100 p-2 text-gray-600"
              >
                {item.itemName || "Select Item"}
              </div>
              <OptionSelectionDialog
                open={isDropdownVisible}
                onClose={() => setDropdownVisible(false)}
                options={items}
                selectedOption={selectedItem}
                setSelectedOption={setSelectedItem}
                handleListChange={handleListChange}
                index={index}
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
                min={1}
                value={item.count}
                onChange={(e) => handleListChange(index, e)}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleListChange(index, e)}
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
            {list.length > 1 && (
              <div>
                <RxCrossCircled
                  onClick={() => removeListItem(index)}
                  className="absolute right-2 top-1 h-6 w-6 hover:cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addListItem}
          disabled={isAddButtonDisabled}
          className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
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
