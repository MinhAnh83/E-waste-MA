'use strict'


const { con } = require('../model/index')

class RequestModel{
    static create = async ({post_id, user_id, expect_price, comments,status='await'}) => {
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO requests SET ?', {
                post_id, user_id, expect_price, comments,status
            }, function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        })
    }
    static initTableToDB = async () => {
        var sql = `CREATE TABLE IF NOT EXISTS requests (request_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            post_id INT NOT NULL,
            user_id INT NOT NULL,
            expect_price DOUBLE NOT NULL, 
             comments VARCHAR(255) NOT NULL,
             status ENUM ('approve','wait'),
             FOREIGN KEY (post_id) REFERENCES posts(post_id),
             FOREIGN KEY (user_id) REFERENCES users(id) )`;
        return con.querySync(sql);
    }
}
module.exports=RequestModel