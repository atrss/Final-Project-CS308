
const mysql = require("mysql");
const con = mysql.createPool({
connectionLimit: 100,
host: "localhost",
user: "root",
password: "root",
database: "FinalProject",
});

function execSql(statement, values) {
    return new Promise(function (res, rej) {
      con.query(statement, values, function (err, result) {
        if (err) rej(err);
        else res(result);
      });
    });
  }
  
export function execSqlSync(sql, array=null) {
    execSql(sql, array)
    .then((result) => {
        console.log("Inserted");
    })
    .catch((err) => {
        console.log("Error: " + err);
    })
    .finally(function (res) {
        con.end();
    })
};