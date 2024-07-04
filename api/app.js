import express from "express";
import userRoute from "./routes/user.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorShow } from "./utils/features.js";
import cookieParser from "cookie-parser";
import userChat from "./routes/chat.route.js";
import adminRoute from "./routes/admin.router.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE } from "./constants/events.js";
import { v4 as uuid } from "uuid";
dotenv.config();

const app = express();
const server = createServer(app); // Create HTTP server using Express app

// Create Socket.IO instance and attach it to HTTP server
const io = new Server(server, {}); // You can pass options to Server if needed

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const userSocketIDs = new Map();

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/chat", userChat);
app.use("/admin", adminRoute);

// Middleware to handle errors
app.use(errorShow);

// Start the HTTP server
server.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  // Corrected event name to "connection"
  console.log("User connected:", socket.id);
  const userr = {
    _id: "yashuIDs",
    name: "yashu",
  };
  userSocketIDs.set(userr._id, socket.id);
  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
    const messageForRealTime = {
      content: messages,
      _id: uuid(),
      sender: {
        _id: userr._id,
        name: userr.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
      members,
    };
    const messagesForDb = {
      content: messages,
      sender: userr._id,
      chat: chatId,
    };

    console.log("New Message", messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
