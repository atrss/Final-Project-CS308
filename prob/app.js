const express = require("express");
const path = require("path");
const cors = require("cors");

const router = express.Router({ mergeParams: true });
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());
const views = path.join(__dirname, "views");

router.get("/", (req, res) => {
    res.sendFile(path.join(views, "intro1.html"));
});

router.get("/intro_2", (req, res) => {
    res.sendFile(path.join(views, "intro2.html"));
});

router.get("/game", (req, res) => {
    res.sendFile(path.join(views, "game.html"));
});

router.use("/images", express.static(path.join(__dirname, "images")));
router.use("/js", express.static(path.join(__dirname, "js")));
router.use("/docs", express.static(path.join(__dirname, "docs")));

module.exports = { router };
