const express = require("express");
const path = require("path");
const { execSqlSync } = require("./driver.js");

const app = express();
const views = path.join(__dirname, "views");

app.get("/", (req, res) => {
    res.sendFile(path.join(views, "intro1.html"));
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(views, "game.html"));
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.post("/addtoDB", (req, res) => {
    // add to DB
    // execFileSync()
});

module.exports = { app };