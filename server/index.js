import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();
import cors from "cors";
import http from "http";

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
});

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on("send_ooowee", (data) => {
        socket.broadcast.emit("receive_ooowee", data);
    }
    );
});


httpServer.listen(3001, () => {
    console.log("Server started on port 3001");
}
);
