import React, { useState } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios"; // Import axios

const MonthlyReport = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleGenerateReport = async () => {
    if (!selectedDate) {
      alert("Please select a month and year.");
      return;
    }

    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    const year = selectedDate.getFullYear();

    setLoading(true);
    setError(""); // Reset error

    try {
      const response = await axios.get(`/api/report?month=${month}&year=${year}`);
      if (response.data) {
        // Handle the response data, e.g., trigger file download or display the report
        const link = document.createElement("a");
        link.href = response.data.fileUrl; // assuming the response contains the file URL
        link.download = response.data.filename; // assuming the response contains the filename
        link.click();
      } else {
        alert("No data found for the selected month and year.");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      setError("Failed to generate the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <DatePicker
              label="Select Month"
              value={selectedDate}
              onChange={handleDateChange}
              views={['month', 'year']}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Report"}
            </Button>
          </Grid>
        </Grid>
        {error && <Box sx={{ color: "red", marginTop: 2 }}>{error}</Box>}
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlyReport;
