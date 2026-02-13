import React from "react";

function ScoreCard({ user, score, languages, metrics }) {
  const getScoreLevel = (score) => {
    if (score < 40) return "Beginner";
    if (score < 60) return "Intermediate";
    if (score < 80) return "Advanced";
    return "Elite";
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/10">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatarUrl}
          alt={user.login}
          className="w-16 h-16 rounded-full border-2 border-blue-400"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.login}</h2>
          <p className="text-gray-300">
            Followers: {user.followers} | Repos: {user.totalRepos} | Pinned: {user.pinnedCount}
          </p>
        </div>
      </div>

      {/* Score Bar */}
      <div className="mt-6">
        <h3 className="font-semibold mb-1">Portfolio Score: {score}/100 ({getScoreLevel(score)})</h3>
        <div className="w-full bg-gray-700 rounded-full h-6">
          <div
            className="bg-blue-500 h-6 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white/20 p-3 rounded-xl text-center">
          <p className="font-bold text-lg">{metrics.totalStars}</p>
          <p className="text-gray-300 text-sm">Stars</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl text-center">
          <p className="font-bold text-lg">{metrics.totalForks}</p>
          <p className="text-gray-300 text-sm">Forks</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl text-center">
          <p className="font-bold text-lg">{metrics.totalCommits}</p>
          <p className="text-gray-300 text-sm">Commits</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl text-center">
          <p className="font-bold text-lg">{metrics.totalPRs}</p>
          <p className="text-gray-300 text-sm">Pull Requests</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl text-center">
          <p className="font-bold text-lg">{metrics.totalIssues}</p>
          <p className="text-gray-300 text-sm">Issues</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl text-center">
          <p className="font-bold text-lg">{metrics.readmeCoverage}</p>
          <p className="text-gray-300 text-sm">README Coverage</p>
        </div>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Languages:</h3>
        {Object.keys(languages).length === 0 ? (
          <p className="text-gray-300">No languages detected</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(languages).map(([lang, count]) => (
              <div key={lang} className="flex items-center">
                <span className="w-24">{lang}</span>
                <div className="h-4 bg-gray-700 flex-1 rounded-full ml-2">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${(count / user.totalRepos) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-gray-300">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScoreCard;
