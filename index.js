const express = require("express");
const socket = require("socket.io");
const app = express();

// Static files
app.use(express.static("public"));

// Server setup
let server = app.listen(4000, () => {
  console.log("listening to requests on port 4000");
});

// Socket setup
const io = socket(server);
io.on("connection", socket => {
  console.log(`made a socket connection ${socket.id}`);

  // Handle chat event
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
