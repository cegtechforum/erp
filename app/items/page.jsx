"use client";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
const items = [
  { name: "pen", count: 50 },
  { name: "chair", count: 15 },
  { name: "table", count: 15 },
  { name: "projectors", count: 3 },
  { name: "paper", count: 15 },
];

export default function Page() {
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const handleShowUpdate = (index) => {
    setEditIndex(index === editIndex ? null : index);
  };
  useEffect(() => {
    console.log(search);
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    console.log(filteredItems);
  }, [search]);
  return (
    <div className="font-sans">
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
            {filteredItems.map((item, index) => (
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
                  {editIndex === index ? (
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
                      />
                      <button
                        className="mx-1 rounded-lg bg-green-700 p-2 text-white hover:bg-green-600"
                        onClick={() => handleShowUpdate(index)}
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
                        onClick={() => handleShowUpdate(index)}
                      >
                        Update
                      </button>
                      <button
                        className="mx-1 rounded-lg bg-red-700 p-2 text-white hover:bg-red-600"
                        onClick={() => console.log(`Delete item: ${item.name}`)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
