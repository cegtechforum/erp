"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputBase,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const OptionSelectionDialog = ({
  open,
  onClose,
  options,
  selectedOption,
  setSelectedOption,
  handleListChange,
  index,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customItem, setCustomItem] = useState("");
  const dropdownRef = useRef(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      ref={dropdownRef}
      aria-labelledby="item-selection-dialog"
      sx={{
        "& .MuiDialog-paper": {
          width: "650px", // Adjust dialog width
          height: "80vh", // Adjust dialog height
          maxWidth: "90%", // Ensure responsive behavior
          maxHeight: "90vh", // Ensure responsive behavior
          overflow: "hidden", // Prevent visible scrollbars
        },
      }}
    >
      <DialogTitle>Select Item</DialogTitle>
      <DialogContent
        sx={{
          height: "100%", // Fill dialog height
          overflowY: "scroll", // Enable vertical scrolling
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "-ms-overflow-style": "none", // Hide scrollbar for Internet Explorer
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for WebKit-based browsers
          },
        }}
      >
        <InputBase
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "100%",
            height: "30px",
            padding: "0 8px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            "&:focus-within": {
              borderColor: "#3f51b5", // Change border color on focus
            },
          }}
        />
        <RadioGroup
          aria-label="Item"
          name="itemName"
          value={selectedOption}
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedOption(selected);
            handleListChange(index, {
              target: { name: "itemName", value: selected },
            });
            if (selected === "others") {
              setCustomItem("");
            }
          }}
        >
          <div
            style={{
              height: "calc(80vh - 200px)", // Adjust height based on the dialog height and other content
              overflowY: "scroll", // Enable scrolling for the inner div
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              "-ms-overflow-style": "none", // Hide scrollbar for Internet Explorer
            }}
          >
            {options
              .filter((option) =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((option) => (
                <FormControlLabel
                  key={option.itemName || option.name}
                  control={<Radio />}
                  label={option.name}
                  value={option.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  labelPlacement="start"
                />
              ))}

            {/* Custom item with radio button */}
            <FormControlLabel
              control={<Radio />}
              label={
                <TextField
                  fullWidth
                  label="Enter Custom Item"
                  value={customItem}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    setCustomItem(e.target.value);
                    handleListChange(index, {
                      target: { name: "itemName", value: e.target.value },
                    });
                  }}
                  placeholder="Custom item"
                  margin="normal"
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "35px", // Adjust input height
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      transition:
                        "font-size 0.2s ease-in-out, transform 0.2s ease-in-out",
                      transform: "translate(14px, 7px)", // Center the label when not focused
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      fontSize: "12px",
                      transform: "translate(14px, -6px)", // Move label up when focused
                    },
                    "& .MuiInputLabel-root.MuiFormLabel-filled": {
                      fontSize: "12px", // Smaller font size when input has value
                      transform: "translate(14px, -6px)", // Align with focused label position
                    },
                  }}
                />
              }
              value={customItem} // Ensures the radio button selects when the custom field is edited
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              labelPlacement="start" // Place the custom field to the right of the radio button
            />
          </div>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptionSelectionDialog;
