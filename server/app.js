const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const usersLogic = require("./bll/users-logic");
const vacationsLogic = require("./bll/vacations-logic");
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followsController = require("./controllers/follows-controller");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api/users", usersController);
server.use("/api/vacations", vacationsController);
server.use("/api/follows", followsController);


const httpServer = http.createServer(server).listen(3002, () => console.log("Socketing...")); // Need express
const socketServer = socketIO.listen(httpServer); // Need the http
const allSockets = [];

socketServer.sockets.on("connection", async socket => {
    allSockets.push(socket);
    console.log("One client has been connected... Total clients:"+allSockets.length);

    socket.on("user-availability-check", async user => {
        const isAvailable = await usersLogic.userAvailabilityCheck(user);
        socketServer.sockets.emit("user-availability-check", isAvailable.length < 1 ? "true" : "false");
    });

    socket.on("admin-made-changes", async () => {
        socketServer.sockets.emit("admin-made-changes", await vacationsLogic.getAllVacations());
    });

    socket.on("disconnect", () => {
        allSockets.splice(allSockets.indexOf(socket), 1);
        console.log("One Client has been disconnected. Total clients: "+allSockets.length);
    });
});


server.listen(3001, console.log("Listening..."));