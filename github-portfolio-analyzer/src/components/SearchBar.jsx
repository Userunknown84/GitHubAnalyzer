const SearchBar = ({ username, setUsername, onAnalyze }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      
      <input
        type="text"
        placeholder="Enter GitHub Link"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />

      <button
        onClick={onAnalyze}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition transform hover:scale-105"
      >
        Analyze
      </button>

    </div>
  );
};

export default SearchBar;
