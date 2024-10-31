"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function Page() {
  const [editName, setEditName] = useState(null);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [add, setAdd] = useState(false);
  const [first, setFirst] = useState(true);
  const [newItem, setNewItem] = useState({ name: "", count: "" });
  const [curCount, setCurCount] = useState("");
  const currentPath = usePathname();
  const getItems = async () => {
    try {
      const response = await axios.get("/api/items");
      console.log("item retrieved successfully", response.data.res);
      setItems(response.data.res);
      console.log(items);
      setFirst(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowUpdate = (iname) => {
    setEditName(iname === editName ? null : iname);
  };

  const handleShowAdd = () => {
    setAdd(!add);
  };

  const handleUpdate = async (name) => {
    //console.log("handleadd");
    try {
      //console.log("handleadd1");
      //setNewItem((item) => ({ ...item, name: name,count:curCount}));
      const response = await axios.patch("/api/items", {
        name: name,
        count: curCount,
      });
      console.log(response.message);
      getItems();
      setNewItem({ name: "", count: "" });
      setCurCount("");
      handleShowUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("/api/items", newItem);
      console.log(response);
      setNewItem({ name: "", count: "" });
      getItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (name) => {
    try {
      const response = await axios.delete("/api/items", {
        data: { name: name },
      });
      console.log(`Delete item: ${name}`);
      console.log(response.message);
      getItems();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (first) {
      getItems();
      //console.log("first:", first);
    }
    //console.log("items:", items);
  }, []);
  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    // console.log(filteredItems);
  }, [search, items]);
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar currentPath={currentPath} />
        <main className="w-full">
          <SidebarTrigger />
          <div className="h-[calc(100vh-28px)] font-sans">
            <div>
              {/* search bar div */}
              <TextField
                type="text"
                label="Search"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  //console.log(search);
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              {/* items details */}
              <table className="text-md border-collapse border border-slate-700 bg-gray-200 p-5">
                <thead className="text-lg">
                  <tr>
                    <th className="w-1/10 border border-slate-800 px-4 py-2 font-bold">
                      S.No
                    </th>
                    <th className="w-1/3 border border-slate-800 px-4 py-2 font-bold">
                      Item Name
                    </th>
                    <th className="w-1/5 border border-slate-800 px-4 py-2 font-bold">
                      Count
                    </th>
                    <th className="w-1/3 border border-slate-800 px-4 py-2 font-bold">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <tr
                        className="border border-slate-800 text-center font-semibold capitalize"
                        key={index}
                      >
                        <td className="border border-slate-800 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border border-slate-800 px-4 py-2">
                          {item.name}
                        </td>
                        <td className="border border-slate-800 px-4 py-2">
                          {item.count}
                        </td>
                        <td className="flex flex-row items-center justify-center px-4 py-2">
                          {editName === item.name ? (
                            <div className="align-center flex flex-row items-center">
                              {/* <input
                        placeholder="Enter current count"
                        className="mr-2 rounded-lg p-2"
                      /> */}

                              <TextField
                                type="number"
                                label="count"
                                variant="outlined"
                                fullWidth
                                size="small"
                                margin="normal"
                                helperText="Enter current count"
                                value={curCount}
                                onChange={(e) => {
                                  setCurCount(parseInt(e.target.value));
                                  //console.log(curCount);
                                }}
                              />
                              <button
                                className="mx-1 rounded-lg bg-green-700 p-2 text-white hover:bg-green-600"
                                onClick={() => handleUpdate(item.name)}
                              >
                                Save
                              </button>
                              <button
                                className="mx-1 rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-400"
                                onClick={() => handleShowUpdate(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                className="mx-1 rounded-lg bg-green-700 p-2 text-white hover:bg-green-600"
                                onClick={() => handleShowUpdate(item.name)}
                              >
                                Update
                              </button>
                              <button
                                className="mx-1 rounded-lg bg-red-700 p-2 text-white hover:bg-red-600"
                                onClick={() => handleDelete(item.name)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-lg font-semibold">
                      <td colSpan="4" className="text-center">
                        No Item found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {!add && (
                <button
                  className="my-4 w-[20%] self-center rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-600"
                  onClick={handleShowAdd}
                >
                  Add New Item
                </button>
              )}
              {add && (
                <div className="my-10 flex w-[40%] flex-col justify-center self-center border bg-gray-100">
                  <TextField
                    type="text"
                    label="Item Name"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    className="self-center"
                    value={newItem.name}
                    onChange={(e) => {
                      setNewItem((item) => ({ ...item, name: e.target.value }));
                    }}
                  ></TextField>
                  <TextField
                    type="text"
                    label="Count"
                    variant="outlined"
                    size="small"
                    margin="normal"
                    className="self-center"
                    value={newItem.count}
                    onChange={(e) => {
                      setNewItem((item) => ({
                        ...item,
                        count: e.target.value,
                      }));
                    }}
                  ></TextField>
                  <button
                    className="my-4 w-[20%] self-center rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-600"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
