'use strict'

const { con } = require('../model/index')

class CustomerModel {

    static create = async ({ email, password, fullname }) => {
        return new Promise((resolve, reject) => {
            const test = con.query('INSERT INTO customer SET ?', {
                email, password, fullname
            }, function (error, results, fields) {
                if(error) reject(error)

                resolve(results)
            });
        })
    }

    static login = async ({ email, password }) => {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM customer WHERE email = ? AND password = ?', [email, password], 
            function (error, results, fields) {
                if (error) throw error;
                const foundCustomer = results[0] ? results[0] : null
                resolve(foundCustomer)
            });
        })
    }

    static updateToken = async ({ id, token }) => {
        return new Promise((resolve, reject) => {
            con.query('UPDATE customer SET token = ? WHERE id = ?', [token, id], 
            function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        })
    }

    static getCustomerByEmail = async (email) => {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM customer WHERE email = ?', [email], function (error, results, fields) {
                if (error) {
                    reject(error)
                }
        
                const foundShop = results[0] ? results[0] : null
                resolve(foundShop)
            });
        })
    }

    static initTableToDB = async () => {
        var sql = 'CREATE TABLE IF NOT EXISTS customer (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, fullname VARCHAR(255) NOT NULL, token VARCHAR(255))';
        return con.querySync(sql);
    }

}

module.exports = CustomerModel;