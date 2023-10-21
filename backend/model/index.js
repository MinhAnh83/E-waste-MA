var mysql = require('mysql')
const { promisify } = require('util')
require('dotenv').config()

var con = mysql.createConnection({
    host: process.env['MYSQL_HOST'] || "localhost",
    user: process.env['MYSQL_USERNAME'] || "root",
    database: process.env['MYSQL_DB'] || "mango",
    password: process.env['MYSQL_PASSWORD'] || null
});

function connection(cb) {
    con.connect(function(err){
        if(err) throw err;
        console.log("Database is Connected::::::");
        // Tạo ra một phương thức query mới nhưng là hàm promise
        con.querySync = promisify(con.query)
        cb && cb();
    });
}

function triggerDatabase() {
    con.query("CREATE DATABASE mango", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
}


module.exports = {
    con,
    connection,
    triggerDatabase,
}