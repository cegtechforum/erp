import React, { useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const MonthlyReport = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleGenerateReport = async () => {
    if (!selectedDate) {
      alert("Please select a month and year.");
      return;
    }

    const [year, month] = selectedDate.split("-");

    setLoading(true);

    try {
      const response = await axios.get(
        `/api/report?month=${month}&year=${year}`,
        {
          responseType: "blob",
        },
      );

      if (response.status === 200) {
        const contentDisposition = response.headers["content-disposition"];
        const fileName = contentDisposition
          ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
          : "full_events_report.xlsx";

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Report Generated");
      } else {
        console.log(response.data);
        toast(response.data.message, {
          icon: "⚠️",
        });
      }
    } catch (error) {
      console.log("Error generating report:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <label htmlFor="month-picker">Select Month:</label>
          <input
            id="month-picker"
            type="month"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontSize: "16px",
            }}
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
    </Box>
  );
};

export default MonthlyReport;
