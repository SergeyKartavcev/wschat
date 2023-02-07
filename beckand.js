const http = require("http");
const {Server} = require("socket.io");
const express = require("express");
const app = express()
const httpServer = http.createServer(app);
const io = new Server(httpServer);
io.on("connection", (ws)=>{
    console.log("new client connected");
    ws.emit("chatMessage", "Welcome to chat");
    ws.broadcast.emit("chatMessage", "New user connected");
     ws.on("chatMessage", (message) => {
        ws.broadcast.emit("chatMessage", message);
     });
});

const {PORT = 5000} = process.env

app.get("/", (req, res, next)=>{
  res.sendFile(__dirname + "/index.html")
})

httpServer.listen(PORT, (err) => {
  if(err){
    console.error(err);
    process.exit(1)
  }
    console.log("listening on port 5000");
  });