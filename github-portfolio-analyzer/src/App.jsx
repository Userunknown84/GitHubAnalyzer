import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ScoreCard from "./components/ScoreCard";
import Suggestions from "./components/Suggestions";
import { fetchGitHubData } from "./services/githubService";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!username) return;

    setError("");
    let cleanUsername = username.trim();

    if (username.includes("github.com")) {
      const parts = username.split("/");
      cleanUsername = parts[3] || cleanUsername;
    }

    setLoading(true);
    setData(null);

    try {
      const result = await fetchGitHubData(cleanUsername);

      if (!result.success) {
        setError(result.message || "User not found");
      } else {
        setData(result.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          GitHub Portfolio Analyzer 🚀
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Turn your GitHub into recruiter-ready proof.
        </p>

        <div className="flex justify-center mt-6">
          <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/10">
            <SearchBar
              username={username}
              setUsername={setUsername}
              onAnalyze={handleAnalyze}
            />

            {loading && (
              <p className="mt-4 text-center animate-pulse text-blue-400">
                🔍 Analyzing...
              </p>
            )}

            {error && (
              <p className="mt-4 text-center text-red-400 font-medium">{error}</p>
            )}
          </div>
        </div>

        {data && (
          <div className="mt-10 space-y-6">
            <ScoreCard
              user={data.userData}
              score={data.score}
              languages={data.languages}
              metrics={data.metrics}
            />

            <p className="text-green-400">
              ⚡ Response Time: {data.responseTime} ms
            </p>

            <Suggestions suggestions={data.suggestions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
