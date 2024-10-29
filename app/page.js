"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl text-red-400">Hello Everynyaan!</h1>
      <button
        className="rounded-lg bg-blue-500 px-8 py-2 font-medium text-white"
        onClick={() => router.push("/login")}
      >
        Get Started
      </button>
    </main>
  );
}
