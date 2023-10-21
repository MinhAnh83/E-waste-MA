'use strict'


const { con } = require('../model/index')
class ProductModel{
    static getProducts =async()=>{
       return new Promise((resolve, reject) => {
            con.query("SELECT * FROM products  INNER JOIN categories ON products.CategoryID= categories.CategoryID ", function(error, results, fields){
                if(error) reject(error)
            
                resolve(results)
            })
        })
    }
static getProductById=async(id)=>{
    return new Promise((resolve,reject)=>{
        con.query("SELECT * FROM products WHERE ProductID =? ",[id],function(err,result,field){
            if(err) reject(err)
            resolve(result)
        })
    })
}
static getCategoryById=(id)=>{
    return new Promise((resolve,reject)=>{
        con.query("SELECT * FROM categories WHERE CategoryID =? ",[id], function(err,result,field){
            if(err) reject (err)
            resolve(result)
        })
    })
}
static searchProduct=async(text)=>{
    return new Promise((resolve,reject)=>{
        con.query("SELECT * FROM products WHERE Name like '% ? %'",[text], function(err,result){
            if(err) reject(err)
            resolve(result)
        })
        

    })
}

    static initTableToDB = async () => {
        var sql2 = "CREATE TABLE IF NOT EXISTS products (ProductID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, CategoryID INT NOT NULL, Name VARCHAR(50) NOT NULL, Description VARCHAR(1000) NOT NULL, Price INT NULL,  ImagePath VARCHAR(255) NULL, FOREIGN KEY (CategoryID) REFERENCES categories(CategoryID)) ";
        con.querySync(sql2)
    }
}
module.exports = ProductModel;