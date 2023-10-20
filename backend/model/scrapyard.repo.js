'use strict'


const { con } = require('./index')
class ScrapyardModel{
    static initTableToDB =  () => {
        var sql = `CREATE TABLE IF NOT EXISTS scrapyards (scrapyard_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            address VARCHAR(255)  NOT NULL,
            name VARCHAR(255)  NOT NULL,  
            image VARCHAR(255)  ,  
            langlat VARCHAR(255)  NOT NULL, 
            open_time DATE,
            FOREIGN KEY (user_id) REFERENCES users(id) )`;
        return con.querySync(sql);
    }
}
module.exports=ScrapyardModel