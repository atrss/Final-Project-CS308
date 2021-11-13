const express = require("express");
const path = require("path");
app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(views, "index.html"));
});

app.get("/task.js", (req, res) => {
    res.sendFile(path.join(views, "task.js"));
});

app.get("/TOL_style.css", (req, res) => {
    res.sendFile(path.join(views, "TOL_style.css"));
});

module.exports = { app };
