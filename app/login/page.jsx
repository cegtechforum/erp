"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        router.push("/");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      if (error.response) {
        setErrorMessage("Invalid login credentials.");
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later.",
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <Typography variant="h4" className="mb-4 text-center">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50"
          />
          {errorMessage && (
            <Typography className="text-center text-red-500">
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;