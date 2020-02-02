const express = require("express");
const followsLogic = require("../bll/follows-logic");

const router = express.Router();

router.get("/:id", async (request, response) => {
    try {
        const userId = request.params.id;
        let follows = await followsLogic.getUsersFollows(userId);
        follows = follows.map(f => f.vacationID.toString());
        response.json(follows);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

router.post("/", async (request, response) => {
    try {
        const follow = request.body;
        const addedFollow = await followsLogic.addFollow(follow);
        response.json(addedFollow);
    } catch (error) {
        response.status(201).status(500).json(error.message);
    }
});

router.delete("/", async (request, response) => {
    try {
        const follow = request.body;
        const deletedFollow = await followsLogic.deleteFollow(follow);
        response.json(deletedFollow);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

router.get("/", async (request, response) => {
    try {
        const follows = await followsLogic.getFollowsReport();
        response.json(follows);
    } catch (error) {
        response.status(500).json(error.message);
    }
})

module.exports = router;