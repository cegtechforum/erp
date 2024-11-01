import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";

const AddItemForm = ({ setAdd, getItems }) => {
  const [newItem, setNewItem] = useState({ name: "", count: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((item) => ({ ...item, [name]: value }));
  };

  const handleAdd = async () => {
    if (!newItem.name.trim() || !newItem.count.trim()) return;
    try {
      const response = await axios.post("/api/items", newItem);
      setNewItem({ name: "", count: "" });
      if (response.data.status !== 200) {
        throw new Error(response.data.error);
      }
      toast.success("Added Successfully");
      getItems();
    } catch (error) {
      toast.error(error.message || "Error occured");
    } finally {
      setAdd(false);
    }
  };

  return (
    <div className="mx-auto mb-4 mt-10 flex w-80 flex-col items-center justify-center self-center rounded-lg border bg-gray-100 px-6">
      <TextField
        type="text"
        label="Item Name"
        name="name"
        variant="outlined"
        size="small"
        margin="normal"
        value={newItem.name}
        onChange={handleChange}
      />
      <TextField
        type="text"
        label="Count"
        name="count"
        variant="outlined"
        size="small"
        margin="normal"
        value={newItem.count}
        onChange={handleChange}
      />
      <button
        className="my-4 w-full self-center rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-600"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddItemForm;
