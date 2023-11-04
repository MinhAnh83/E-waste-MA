'use strict'


const { con } = require('../model/index')

class RequestModel{
    static initTableToDB = async () => {
        var sql = `CREATE TABLE IF NOT EXISTS requests (request_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            post_id INT NOT NULL,
            user_id INT NOT NULL,
            expectPrice DOUBLE NOT NULL, 
             comments VARCHAR(255) NOT NULL,
             status ENUM ('approve','wait'),
             FOREIGN KEY (post_id) REFERENCES posts(post_id),
             FOREIGN KEY (user_id) REFERENCES users(id) )`;
        return con.querySync(sql);
    }
}
module.exports=RequestModel