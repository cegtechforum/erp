"use client";
import Link from "next/link";
import axios from "axios";

export default function HomePage() {
  async function logout() {
    try {
      await axios.get("/api/logout");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl font-semibold text-emerald-400">
        Hello Everynyaan!
      </h1>
      <Link
        className="rounded-lg bg-blue-500 px-8 py-2 font-medium text-white"
        href={"/login"}
      >
        Get Started
      </Link>
      <button
        className="rounded-lg bg-red-500 px-8 py-2 font-medium text-white"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
}
