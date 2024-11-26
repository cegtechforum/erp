// components/GoBackButton.js
"use client";

import { useRouter } from "next/navigation";
 
export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/events")}
      className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Go Back
    </button>
  );
}
