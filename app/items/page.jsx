"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { usePathname } from "next/navigation";

export default function Page() {
  const [editName, setEditName] = useState(null);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [add, setAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", count: "" });
  const [curCount, setCurCount] = useState("");
  const currentPath = usePathname();
  const [loading, setLoading] = useState(true);
  let role2 = "admin";
  //let role2="user";

  // const [domain, setDomain] = useState("");

  // useEffect(() => {
  //   function getDomainFromToken() {
  //     // Retrieve token from local storage
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       // Decode the JWT token
  //       const decodedToken = jwt_decode(token);
  //       console.log("token:",decodedToken);
  //       // Assuming your user data contains a 'domain' property
  //       const userDomain = decodedToken.super_user; // Adjust this based on your JWT structure
  //       setDomain(userDomain);
  //     }
  //   }

  //   getDomainFromToken(); // Call the function to fetch domain
  //   console.log("superUser:", domain);
  // }, []);

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
      if (newItem.name !== "" && newItem.count !== "") {
        const response = await axios.post("/api/items", newItem);
        console.log(response);
        setNewItem({ name: "", count: "" });
        getItems();
      }
    } catch (err) {
      console.log(err);
    } finally {
      handleShowAdd();
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
    async function getItems() {
      try {
        const response = await axios.get("/api/items");
        console.log("item retrieved successfully", response.data.res);
        setItems(response.data.res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, items]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-[95%] flex-col">
      <SidebarProvider>
        <AppSidebar currentPath={currentPath} />
        <main className="w-full">
          <SidebarTrigger />
          <div className="h-[calc(100vh-28px)] font-sans">
            <div>
              <h1 className="flex flex-row justify-center text-3xl font-bold">
                Available Logistics📃
              </h1>
            </div>
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
                }}
                className="mb-4"
              />
            </div>
            <div className="overflow-auto rounded-xl">
              {/* items details */}
              <table className="text-md w-full border-collapse border border-slate-700 bg-gray-200 shadow-lg">
                <thead className="bg-gray-400 text-lg">
                  <tr>
                    <th className="w-1/6 border border-slate-800 px-4 py-2 font-bold">
                      S.No
                    </th>
                    <th className="w-1/3 border border-slate-800 px-4 py-2 font-bold">
                      Item Name
                    </th>
                    <th className="w-1/5 border border-slate-800 px-4 py-2 font-bold">
                      Count
                    </th>
                    {role2 == "admin" && (
                      <th className="w-1/3 border border-slate-800 px-4 py-2 font-bold">
                        Options
                      </th>
                    )}
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
                        {role2 == "admin" && (
                          <td className="flex flex-col items-center justify-center px-4 py-2 md:flex-row">
                            {editName === item.name ? (
                              <div className="flex flex-col items-center md:flex-row">
                                <TextField
                                  type="number"
                                  label="count"
                                  InputProps={{
                                    inputProps: { min: 0 },
                                  }}
                                  variant="outlined"
                                  fullWidth
                                  size="small"
                                  margin="normal"
                                  helperText="Enter current count"
                                  value={curCount}
                                  onChange={(e) => {
                                    setCurCount(parseInt(e.target.value));
                                  }}
                                  className="w-full md:w-auto"
                                />
                                <button
                                  className="m-1 w-full rounded-lg bg-green-700 p-2 text-white hover:bg-green-600 md:w-auto"
                                  onClick={() => handleUpdate(item.name)}
                                >
                                  Save
                                </button>
                                <button
                                  className="m-1 w-full rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-400 md:w-auto"
                                  onClick={() => handleShowUpdate(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  className="m-1 w-full rounded-lg bg-green-700 p-2 text-white hover:bg-green-600 md:w-auto"
                                  onClick={() => handleShowUpdate(item.name)}
                                >
                                  Update
                                </button>
                                <button
                                  className="m-1 w-full rounded-lg bg-red-700 p-2 text-white hover:bg-red-600 md:w-auto"
                                  onClick={() => handleDelete(item.name)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        )}
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
              {!add && role2 == "admin" && (
                <button
                  className="mx-auto my-4 flex w-full items-center justify-center rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-600 md:w-[20%]"
                  onClick={handleShowAdd}
                >
                  Add New Item
                </button>
              )}
              {add && (
                <div className="mx-auto my-10 flex w-full flex-col justify-center self-center border bg-gray-100 md:w-[40%]">
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
                    className="my-4 w-full self-center rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-600 md:w-[20%]"
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
