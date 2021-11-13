const express = require("express");

app = express();

app.use("/prob", require("./prob/app").app);
app.use("/tol", require("./tol/app").app);

app.listen(8080);
