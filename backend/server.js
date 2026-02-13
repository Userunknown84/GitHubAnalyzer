import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import githubRoutes from "./routes/github.routes.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "*", 
}));

app.use(express.json());



app.use("/api/github", githubRoutes);



app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Server running 🚀",
    time: new Date(),
  });
});



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Ultra Fast Server running on port ${PORT}`);
});
