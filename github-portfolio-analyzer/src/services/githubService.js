import axios from "axios";

export const fetchGitHubData = async (username) => {
  const response = await axios.get(
    `http://localhost:5000/api/github/${username}`
  );

  return response.data;
};