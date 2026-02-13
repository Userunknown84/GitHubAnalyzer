import axios from "axios";

export const fetchGitHubData = async (username) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/github";

  try {
    const response = await axios.get(`${API_URL}/portfolio/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw error;
  }
};
