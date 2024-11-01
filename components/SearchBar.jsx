const SearchBar = ({ query, setQuery }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Items"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 mt-4 w-full rounded-lg border border-slate-100 p-2"
      />
    </div>
  );
};

export default SearchBar;
