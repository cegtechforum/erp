import Link from "next/link";

export default function HomePage() {
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
    </main>
  );
}
