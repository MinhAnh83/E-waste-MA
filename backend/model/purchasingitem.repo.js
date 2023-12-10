'use strict'
const { con } = require('../model/index')
class PurchasingPriceModel{
    static inittableToDb=()=>{
        const sql =`CREATE TABLE IF NOT EXISTS purchasingitem(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            purchasingprice_id INT NOT NULL,
            name VARCHAR(255)  NOT NULL,  
         quantity INT ,
            price DOUBLE,
            FOREIGN KEY (purchasingprice_id) REFERENCES purchasingprice(id) )`
            return con.querySync(sql)
    }
}
module.exports=PurchasingPriceModel