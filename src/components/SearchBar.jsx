import { FiSearch, FiPlus } from "react-icons/fi";

const SearchBar = ({ search, setSearch, onCreate }) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center flex-1 bg-white border rounded-lg px-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          className="w-full p-2 outline-none"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        onClick={onCreate}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        <FiPlus /> Create Note
      </button>
    </div>
  );
};

export default SearchBar;
