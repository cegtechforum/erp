"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const AddRequestButton = ({event}) => {

  const initialState = {
      items:
      [{
        eventId: event.eventId,
        itemName:"",
        count:"",
        approvedCount:0,
        category:""
     }], 
     eventName:event.eventName,
      domain:event.domain,
    };
    
    const [newItems, setNewItems] = useState(initialState);

  const handleAddItem = () => {
  setNewItems({
    ...newItems,items:[...newItems.items,
      {
        eventId:event.eventId,
        itemName:"",
        count:"",
        approvedCount:0,
        category:"",
      },],
  });
};

  const handleChange = (index, field, value) => {
    const updateditems = [...newItems.items];
    updateditems[index] = {...updateditems[index],[field]:value,};
  
  setNewItems({...newItems,items:updateditems,});
};

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/lists", {
        items:newItems.items,
        eventName: event.eventName,
        domain: event.domain,
      });
      toast.success("Request submitted successfully!");
      setNewItems(initialState);
    } catch (error) {
      toast.error(error.message || "Error occurred");
    }
  };

  return (
    <div className="bg-slate-200 rounded-lg max-w-md mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outlined">Add Request</Button>
        </DialogTrigger>
        <DialogContent className="p-6 w-full bg-[#f6f4f4] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg sm:p-6 mx-auto"
          style={{maxHeight:"80vh",overflowY:"auto"}}>
          <DialogHeader>
            <DialogTitle>Add Requested Items</DialogTitle>
            <DialogDescription>
              Add the items you want to request. You can add multiple items.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {newItems.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
              >
                <Label htmlFor={`itemName-${index}`} className="text-right">
                  Item Name
                </Label>
                <Input
                  id={`itemName-${index}`}
                  value={item.itemName}
                  onChange={(e) =>
                    handleChange(index, "itemName", e.target.value)
                  }
                  placeholder="Item Name"
                  className="col-span-3"
                />
                <Label htmlFor={`count-${index}`} className="text-right">
                  Count
                </Label>
                <Input
                  id={`count-${index}`}
                  value={item.count}
                  onChange={(e) => handleChange(index, "count", e.target.value)}
                  placeholder="Count"
                  className="col-span-3"
                  type="number"
                />
                <Label htmlFor={`category-${index}`} className="text-right">
                  Category
                </Label>
                <Input
                  id={`category-${index}`}
                  value={item.category}
                  onChange={(e) =>
                    handleChange(index, "category", e.target.value)
                  }
                  placeholder="Category"
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <IconButton onClick={handleAddItem} color="primary">
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleRequest}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRequestButton;
