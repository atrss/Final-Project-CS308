const express = require("express");
const path = require("path");

app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/prob", require("./prob/app").router);
app.use("/tol", require("./tol/app").router);
app.listen(8080);
