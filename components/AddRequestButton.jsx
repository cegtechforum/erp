"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, PlusCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import OptionSelectionDialog from "./selectOption";

const AddRequestButton = ({ event }) => {
  const router = useRouter();
  const initialItemState = {
    eventId: event.eventId,
    itemName: "",
    count: "",
    approvedCount: 0,
    description: "",
  };

  const initialState = {
    items: [initialItemState],
    eventName: event.eventName,
    domain: event.domain,
  };

  const [newItems, setNewItems] = useState(initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [isEmergency, setIsEmergency] = useState(false); // Checkbox state

  async function getItems() {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data.res);
      console.log(response.data.res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  const handleListChange = (index, e) => {
    const { name, value } = e.target;
    setNewItems((prev) => {
      const updatedList = [...prev.items];
      updatedList[index][name] = value;
      return { ...prev, items: updatedList };
    });
  };

  const handleAddItem = () => {
    setNewItems((prev) => ({
      ...prev,
      items: [...prev.items, { ...initialItemState }],
    }));
  };

  const handleRemoveItem = (indexToRemove) => {
    if (newItems.items.length > 1) {
      setNewItems((prev) => ({
        ...prev,
        items: prev.items.filter((_, index) => index !== indexToRemove),
      }));
    }
  };

  const handleChange = (index, field, value) => {
    setNewItems((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return { ...prev, items: updatedItems };
    });
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    const isValid = newItems.items.every(
      (item) => item.itemName.trim() && item.count && item.description.trim()
    );

    if (!isValid) {
      toast.error("Please fill in all fields for each item.");
      return;
    }

    try {
      const response = await axios.post("/api/lists", {
        items: newItems.items,
        eventName: event.eventName,
        domain: event.domain,
        emergency: isEmergency, // Send the emergency flag
      });

      toast.success("Request submitted successfully!");
      setNewItems(initialState);
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error occurred while submitting request"
      );
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-xs border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Request
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Requested Items
          </DialogTitle>
          <DialogDescription>
            Add the items you want to request for {event.eventName}. You can add
            multiple items.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {newItems.items.map((item, index) => (
            <div
              key={index}
              className="relative grid grid-cols-1 gap-4 rounded-lg border bg-gray-50 p-4 md:grid-cols-3"
            >
              {newItems.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}

              <div className="space-y-2">
                <Label htmlFor={`itemName-${index}`}>Item Name</Label>
                <Input
                  id={`itemName-${index}`}
                  value={item.itemName || ""}
                  onClick={() => {
                    setSelectedItemIndex(index); // Set the index of the item being edited
                    setIsItemDialogOpen(true); // Open the ItemSelectionDialog
                    setIsDialogOpen(false); // Close the AddRequestDialog
                  }}
                  placeholder="Select Item"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`count-${index}`}>Count</Label>
                <Input
                  id={`count-${index}`}
                  type="number"
                  min="1"
                  value={item.count}
                  onChange={(e) => handleChange(index, "count", e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Input
                  id={`description-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  placeholder="Enter description"
                  className="w-full"
                />
              </div>
            </div>
          ))}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="emergency"
              checked={isEmergency}
              onChange={(e) => setIsEmergency(e.target.checked)}
            />
            <Label htmlFor="emergency">Emergency Request</Label>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddItem}
              className="flex items-center bg-blue-600 font-medium text-white hover:bg-blue-800"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Item
            </Button>

            <DialogFooter>
              <Button
                type="submit"
                onClick={handleRequest}
                className="bg-green-600 px-6 font-medium text-white hover:bg-green-800"
              >
                Submit Request
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>

      <OptionSelectionDialog
        open={isItemDialogOpen}
        onClose={() => {
          setIsItemDialogOpen(false);
          setIsDialogOpen(true); // Reopen the AddRequestDialog when ItemSelectionDialog is closed
        }}
        options={items}
        selectedOption={selectedItem}
        setSelectedOption={setSelectedItem}
        handleListChange={handleListChange}
        index={selectedItemIndex} // Pass the selected index to the ItemSelectionDialog
      />
    </Dialog>
  );
};

export default AddRequestButton;
