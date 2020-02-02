const express = require("express");
const usersLogic = require("../bll/users-logic");
const jwt = require("../JWT");

const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        const user = { ...request.body };
        let responseBody = {};
        const loggedInUser = await usersLogic.getOneUser(user);
        if (loggedInUser.length < 1) {
            responseBody = "There is no such user";
        } else if (user.userPass !== loggedInUser[0].userPass) {
            responseBody = "Username or Password are incorrect";
        } else {
            const option = {
                issuer: "http://localhost:3001",
                subject: String(loggedInUser[0].id)
            }
            const payload = {
                isAdmin: loggedInUser[0].isAdmin,
                fullName: loggedInUser[0].firstName + " " + loggedInUser[0].lastName,
                userName: loggedInUser[0].userName,
                id: loggedInUser[0].id
            };
            const token = await jwt.sign(payload, option);
            responseBody = { token: token,
            payload: payload };
            response.json(responseBody);
            return;
        }
        response.status(200).json(responseBody);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

router.get("/verify", async (request, response) => {
    try {
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        // const token = request.body;
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token) {
            const decodedToken = await jwt.decode(JSON.parse(token));
            var verifyOptions = {
                issuer: "http://localhost:3001",
                subject: decodedToken.payload.sub,
                expiresIn: "1H",
                algorithm: ["RS256"]
            };
            const verifiedToken = await jwt.verify(JSON.parse(token), verifyOptions);
            response.json(verifiedToken);
        } else {
            return response.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } catch (error) {
        response.status(500).json(error.message);
    }
});

router.post("/register", async (request, response) => {
    try {
        const user = request.body;
        const addedUser = await usersLogic.addUser(user);
        response.json(addedUser);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

module.exports = router;