import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`); // Log when a user connects
  socket.on("send_message", (data) => {
    console.log(data);
    io.emit("receive_message", data); // Send the received message to all clients
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is Running at: ${PORT}`);
});
