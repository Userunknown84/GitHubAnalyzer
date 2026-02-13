import React from "react";

function Suggestions({ suggestions }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/10">
      <h3 className="font-semibold text-xl mb-3">Improvement Suggestions:</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-200">
        {suggestions.map((sugg, idx) => (
          <li key={idx}>{sugg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;
