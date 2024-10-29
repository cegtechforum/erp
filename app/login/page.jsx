function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-red-600">
      <div className="flex size-96 flex-col items-center justify-evenly rounded-lg border border-red-200 bg-white p-4">
        <h2 className="text-bold text-3xl uppercase text-red-600">Login</h2>
        <input
          type="email"
          className="w-full rounded-lg border border-red-600 px-4 py-2 text-center text-red-600"
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full rounded-lg border border-red-600 px-4 py-2 text-center text-red-600"
          placeholder="Password"
        />
      </div>
    </main>
  );
}

export default Page;
