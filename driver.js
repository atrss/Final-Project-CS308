const mysql = require("mysql");
const con = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "nodeuser",
    password: "nodeuser@1234",
    database: "finalproject2",
});

function execSql(statement, values) {
    return new Promise(function (res, rej) {
        if (values !== null) {
            con.query(statement, values, function (err, result) {
                if (err) rej(err);
                else res(result);
            });
        }
        con.query(statement, function (err, result) {
            if (err) rej(err);
            else res(result);
        });
    });
}

function execSqlSync(sql, array = null) {
    execSql(sql, array)
        .then((result) => {
            console.log("Inserted");
        })
        .catch((err) => {
            console.log("Error: " + err);
        })
        .finally(function (res) {
            con.end();
        });
}

module.exports = { execSqlSync };
