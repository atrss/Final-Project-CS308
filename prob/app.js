const express = require("express");
const path = require("path");
const { execSqlSync } = require("./driver.js");

const router = express.Router({ mergeParams: true });
const views = path.join(__dirname, "views");

router.get("/", (req, res) => {
    res.sendFile(path.join(views, "intro1.html"));
});

router.get("/game", (req, res) => {
    res.sendFile(path.join(views, "game.html"));
});

router.use("/images", express.static(path.join(__dirname, "images")));
router.use("/js", express.static(path.join(__dirname, "js")));

router.post("/addtoDB", (req, res) => {
    // add to DB
    // execFileSync()
});

module.exports = { router };
