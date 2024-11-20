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
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      setErrorMessage(error.message || "Error Occurred");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <div className="text-center">
          <Typography
            variant="h4"
            className="mb-4 font-bold text-gray-800 sm:text-2xl"
          >
            Welcome Back!
          </Typography>
          <Typography className="text-sm text-gray-500">
            Log in to your account to continue
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg"
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
            className="rounded-lg"
          />
          {errorMessage && (
            <Typography className="text-center text-sm text-red-500">
              {errorMessage}
            </Typography>
          )}
          <button
            type="submit"
            fullWidth
            disabled={isDisabled || isLoading}
            className={`mt-4 rounded-lg text-white transition-all duration-300 ${
              isDisabled
                ? "cursor-not-allowed bg-black"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:to-purple-500"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
