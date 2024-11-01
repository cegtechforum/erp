"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const isDisabled = !password.trim() || !email.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setisLoading(true);
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.data.status === 200) {
        console.log("Login successful:", response.data);
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage(error.message || "Error Occured");
    } finally {
      setisLoading(false);
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
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            autoComplete="off"
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
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
