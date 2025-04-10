import express from "express";
import mongoose from "./db/Connection.js";
import authRouter from "./routes/Auth.js";
import noteRouter from "./routes/note.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();

// ✅ Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter); // Fixed route naming consistency

// ✅ Serve uploaded files properly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Serve frontend build (Vite/React)
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// ✅ Connect to MongoDB and Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  mongoose(); // Connect to MongoDB
  console.log(`🚀 Server is running on port ${PORT}`);
});
