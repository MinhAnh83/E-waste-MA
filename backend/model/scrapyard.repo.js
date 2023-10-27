'use strict'


const { con } = require('./index')
class ScrapyardModel{
    static getScrapyards = async () => {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM scrapyards  ', function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }

    static createScrapyard = async ({ address, name, image, langlat, open_time ,user_id}) => {
        console.log('init')
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO scrapyards SET ? ', {address, name, image, langlat, open_time ,user_id} ,
                function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        reject(error)
                    }
                    resolve(results)
                })
        })
    }
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