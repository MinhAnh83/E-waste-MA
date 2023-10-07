'use strict'


const { con } = require('../model/index')
class CartModel {
    static inittableToDb= async()=>{
const sql="CREATE TABLE IF NOT EXISTS cart (CartID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, CustomerID INT NOT NULL, ListProduct TEXT NOT NULL, Totalprice INT , ShipCost INT , Discount INT, FOREIGN KEY (CustomerID) REFERENCES customer(id))"
return con.querySync(sql)
    }
}
module.exports=CartModel