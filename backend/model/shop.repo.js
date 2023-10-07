'use strict'


const { con } = require('./index')
class ShopModel{

    static getShopById = async (id) => {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM shop WHERE id = ?', [id], function (error, results, fields) {
                if (error) reject(reject)
                const foundShop = results[0] ? results[0] : null
                resolve(foundShop)
            });
        })
    }

    static updateToken = async (id, token) => {
        return new Promise((resolve, reject) => {
            con.query('UPDATE shop SET token = ? WHERE id = ?', [token, id], function (error, results, fields) {
                if (error) reject(reject)
                const foundShop = results[0] ? results[0] : null
                resolve(results)
            });
        })
    }

     static initTableToDB = async () => {
        var sql2 ='CREATE TABLE IF NOT EXISTS shop (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, shopname VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, role ENUM("admin", "staff") NOT NULL, token VARCHAR(255))';
        con.query(sql2,function(err,result){
            if(err) throw err;
            console.log("Table products created!")
        })
    }
}
 module.exports=ShopModel;