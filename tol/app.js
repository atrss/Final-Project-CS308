const express = require("express");
const path = require("path");
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

router.use("/style", express.static(path.join(__dirname, "style")));
router.use("/js", express.static(path.join(__dirname, "js")));

module.exports = { router };
