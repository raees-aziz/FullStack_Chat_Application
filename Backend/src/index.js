import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./lib/connection.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app,server } from "./lib/socket.js";
import path from "path"

// Load environment variables

// Declare the port correctly
const PORT = process.env.PORT || 5001; // Default to 5001 if not set
const __dirname=path.resolve()


// Middleware
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_FRONTEND_LINK,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Server running
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB(process.env.MONGODB_URL);
});
