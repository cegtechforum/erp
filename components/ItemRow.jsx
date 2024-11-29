import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";
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
import { Button } from "@/components/ui/button";

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
      console.log(response);
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
    <tr className="border border-slate-800 text-center font-semibold capitalize">
      <td className="border border-slate-800 px-4 py-2">{item.index + 1}</td>
      <td className="border border-slate-800 px-4 py-2">{item.name}</td>
      <td className="border border-slate-800 px-4 py-2">{item.count}</td>
      <td className="flex flex-col items-center justify-center px-4 py-2 md:flex-row">
        {editName === item.name ? (
          <div className="flex flex-col items-center md:flex-row">
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
            <button
              className="m-1 w-full rounded-lg bg-green-700 p-2 text-white hover:bg-green-600 md:w-auto"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="m-1 w-full rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-400 md:w-auto"
              onClick={handleShowUpdate}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              className="m-1 w-full rounded-lg bg-green-700 p-2 text-white hover:bg-green-600 md:w-auto"
              onClick={handleShowUpdate}
            >
              Update
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="m-1 w-full rounded-lg bg-red-700 text-white hover:bg-red-600 md:w-auto"
                >
                  Delete
                </Button>
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
          </>
        )}
      </td>
    </tr>
  );
};

export default ItemRow;
