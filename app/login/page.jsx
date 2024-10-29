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
        <select className="w-full rounded-lg border border-red-500 px-4 py-2 text-center text-red-600">
          <option value="creativity & initiatives">
            Creativity & Initiatives
          </option>
          <option value="contents">Contents</option>
          <option value="design">Design</option>
          <option value="events">Events</option>
          <option value="finance">Finance</option>
          <option value="guest lectures">Guest Lectures</option>
          <option value="hospitality">Hospitality</option>
          <option value="human resources">Human Resources</option>
          <option value="industry relations">Industry Relations</option>
          <option value="internal auditing">Internal Auditing</option>
          <option value="logistics">Logistics</option>
          <option value="marketing & media">Marketing & Media</option>
          <option value="projects & research">Projects & Research</option>
          <option value="quality assurance & control">
            Quality Assurance & Control
          </option>
          <option value="techops">TechOps</option>
          <option value="workshops">Workshops</option>
          <option value="xceed & karnival">Xceed & Karnival</option>
        </select>
      </div>
    </main>
  );
}

export default Page;
