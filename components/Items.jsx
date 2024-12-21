"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import SearchBar from "./SearchBar";
import ItemTable from "./ItemTable";
import AddItemForm from "./AddItemForm";

export default function Items() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data.res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-28px)] px-6">
      <h1 className="flex flex-row justify-center text-3xl font-bold">
        Available Logistics📃
      </h1>
      <SearchBar query={query} setQuery={setQuery} />
      <ItemTable items={items} query={query} getItems={getItems} />
      {add && <AddItemForm setAdd={setAdd} getItems={getItems} />}
      {!add && (
        <button
          className="mx-auto my-4 flex w-full items-center justify-center rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-600 md:w-[20%]"
          onClick={() => setAdd(true)}
        >
          Add New Item
        </button>
      )}
    </div>
  );
}
