"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import SearchBar from "./SearchBar";
import ItemTable from "./ItemTable";
import AddItemForm from "./AddItemForm";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Items({ isSuperUser }) {
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
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col px-6">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="min-h-[calc(100vh-28px)]">
            <h1 className="flex flex-row justify-center text-3xl font-bold">
              Available Logistics📃
            </h1>
            <SearchBar query={query} setQuery={setQuery} />
            <ItemTable
              items={items}
              query={query}
              isSuperUser={isSuperUser}
              getItems={getItems}
            />
            {add && <AddItemForm setAdd={setAdd} getItems={getItems} />}
            {!add && isSuperUser && (
              <button
                className="mx-auto my-4 flex w-full items-center justify-center rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-600 md:w-[20%]"
                onClick={() => setAdd(true)}
              >
                Add New Item
              </button>
            )}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
