'use strict'


const { con } = require('../model/index')
class CategoryModel{
    static getCategories=()=>{
        return new Promise((resolve,reject)=>{
            con.query("SELECT * FROM categories", function(err, result){
                if(err) reject(err)
                resolve(result)
            })
        })
    }
    static initTableToDB = async () => {
        var sql1="CREATE TABLE IF NOT EXISTS categories (CategoryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, cate_name VARCHAR (255) NOT NULL) ";
        return con.querySync(sql1)
    }
}
 module.exports = CategoryModel