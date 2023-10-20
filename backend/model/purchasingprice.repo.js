'use strict'
const { con } = require('../model/index')
class PurchasingPriceModel{
    static inittableToDb=()=>{
        const sql =`CREATE TABLE IF NOT EXISTS purchasingprice(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            scrapyard_id INT NOT NULL,
            name VARCHAR(255)  NOT NULL,  
            date_from DATETIME  ,  
            date_to DATETIME  ,   
            detail_items TEXT,
            FOREIGN KEY (scrapyard_id) REFERENCES scrapyards(scrapyard_id) )`
            return con.querySync(sql)
    }
}
module.exports=PurchasingPriceModel