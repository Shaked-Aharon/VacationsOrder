const express = require("express");
const vacationsLogic = require("../bll/vacations-logic");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const upload = multer({ dest: "..\\client\\public\\assets\\images" });
const router = express.Router();


router.get("/", async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

router.delete("/", (request, response) => {
    try {
        const vacation = request.body;
        fs.unlink(`..\\client\\public\\assets\\images\\${vacation.img}`, async err => {
            if (err) {
                console.log(err);
                return;
            }
            const Deletedvacation = await vacationsLogic.deleteVacation(vacation);
            response.json(Deletedvacation);
        });
    } catch (error) {
        response.status(500).json(error.message);
    }
});


router.post("/", upload.single("vacationImage"), async (request, response) => {
    try {
        const vacation = JSON.parse(request.body.vacation);
        if (request.file) {
            const fileExtension = path.extname(request.file.originalname);
            const multerFilename = request.file.destination + "\\" + request.file.filename;
            const finalFileName = multerFilename + fileExtension;
            const imgNewFullName = multerFilename.split("\\").pop() + fileExtension;
            vacation.img = imgNewFullName;
            fs.rename(multerFilename, finalFileName, async err => {
                if (err) {
                    response.status(500).json(err);
                    return;
                }
            });
        }
        if (request.body.type === "Edit") {
            const updatedVacation = await vacationsLogic.updateVacation(vacation);
            response.json(updatedVacation);
        } else {
            const addedVacation = await vacationsLogic.addVacation(vacation);
            response.json(addedVacation);
        }
    } catch (error) {
        response.status(500).json(error.message);
    }

});


router.put("/", upload.single("vacationImage"), async (request, response) => {
    try {
        const fileExtension = path.extname(request.file.originalname);
        const multerFilename = request.file.destination + "\\" + request.file.filename;
        const finalFileName = multerFilename + fileExtension;
        const imgNewFullName = multerFilename.split("\\").pop() + fileExtension;
        const vacation = JSON.parse(request.body.vacation);
        vacation.img = imgNewFullName;
        fs.rename(multerFilename, finalFileName, async err => {
            if (err) {
                response.status(500).json(err);
                return;
            }
        });
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    } catch (error) {
        response.status(500).json(error.message);
    }
});


module.exports = router;