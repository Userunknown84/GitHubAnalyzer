import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import githubRoutes from "./routes/github.routes.js";

dotenv.config();

const app = express();

/*
=========================================
🛠️  MIDDLEWARES
=========================================
*/

app.use(cors({
  origin: "*", // production me specific frontend URL daalna
}));

app.use(express.json());


/*
=========================================
📡 ROUTES
=========================================
*/

app.use("/api/github", githubRoutes);

/*
=========================================
❤️ HEALTH CHECK
=========================================
*/

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Server running 🚀",
    time: new Date(),
  });
});


/*
=========================================
❌ 404 HANDLER
=========================================
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


/*
=========================================
🔥 GLOBAL ERROR HANDLER
=========================================
*/

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});


/*
=========================================
🚀 SERVER START
=========================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Ultra Fast Server running on port ${PORT}`);
});
