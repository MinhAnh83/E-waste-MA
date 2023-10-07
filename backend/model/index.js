var mysql = require('mysql')
const { promisify } = require('util')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mango"
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