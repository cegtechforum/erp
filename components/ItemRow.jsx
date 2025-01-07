import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ItemRow = ({ item, getItems }) => {
  const [editName, setEditName] = useState(null);
  const [curCount, setCurCount] = useState("");

  const handleShowUpdate = () => {
    setEditName(editName === item.name ? null : item.name);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch("/api/items", {
        name: item.name,
        count: curCount,
      });
      if (response.data.status !== 201) {
        throw new Error(response.data.error);
      }
      toast.success("Updated Successfully");
      setEditName(null);
      getItems();
    } catch (error) {
      toast.error(error.message || "Error occured");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/items", {
        data: { name: item.name },
      });
      if (response.data.status !== 200) {
        throw new Error(response.data.error);
      }
      toast.success("Deleted Successfully");
      getItems();
    } catch (error) {
      toast.error(error.message || "Error occured");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 border-t border-gray-200 px-6 py-4 text-center">
      <div>{item.index + 1}</div>
      <div>{item.name}</div>
      <div>{item.count}</div>
      <div className="flex flex-col items-center justify-center gap-2">
        {editName === item.name ? (
          <>
            <TextField
              type="number"
              label="count"
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              helperText="Enter current count"
              value={curCount}
              onChange={(e) => setCurCount(e.target.value)}
            />
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <button
                onClick={handleUpdate}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 md:w-auto"
              >
                Save
              </button>
              <button
                onClick={handleShowUpdate}
                className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 md:w-auto"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <button
              onClick={handleShowUpdate}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 md:w-auto"
            >
              Update
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 md:w-auto">
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the Item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemRow;
