import express from "express";
import { analyzePortfolio } from "../services/github.service.js";

const router = express.Router();


router.get("/portfolio/:username", async (req, res) => {
  const { username } = req.params;

  if (!username || username.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  try {
    const result = await analyzePortfolio(username);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("❌ Portfolio Analysis Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while analyzing the portfolio",
    });
  }
});


router.post("/", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Github API hit successfully!",
  });
});


router.get("/health", (req, res) => {
  return res.status(200).json({
    status: "Server is running 🚀",
    timestamp: new Date(),
  });
});

export default router;
