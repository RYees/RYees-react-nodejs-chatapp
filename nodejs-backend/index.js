const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRoute = require("./routes/UserRoute");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");

const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successful");
}).catch((error) => {
    console.log("DB Connection Not Successful", error.message);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", UserRoute);
app.use("/api/messages", messageRoutes);


const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});