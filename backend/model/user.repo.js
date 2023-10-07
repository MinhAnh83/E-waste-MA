'use strict'


const { con } = require('../model/index')
class UserModel {
    static createUser = async ({ email, password, fullname, phonenumer, address, image ,RoleID}) => {
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO users SET ? ', [email, password, fullname, phonenumer, address, image, RoleID] ,
                function (error, results, fields) {
                    if (error) reject(error)
                    resolve(results)
                })
        })
    }
    static getUser = async () => {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM users', function (error, results, fields) {
                if (error) reject(error)

                resolve(results)
            })
        })
    }
    static editUser = async ({ email, password, fullname, phonenumer, address, image, id }) => {
        return new Promise((resolve, reject) => {
            con.query('UPDATE users SET email = ?,password = ?, fullname =?, phonenumber =?, address =?, image=? WHERE id = ? '
                , [email, password, fullname, phonenumer, address, image, id],
                function (error, results) {
                    if (error) reject(error)
                    resolve(results)
                })
        })
    }
    static getUserByEmail=async(email)=>{
        return new Promise((resolve,reject)=>{
            con.query('SELECT * FROM users WHERE email =?',[email],
            function(error,results){
                if(error) reject(error)
                resolve(results)
            })
        })
    }
    static initTableToDB = async () => {
        var sql = 'CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  RoleID INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, fullname VARCHAR(255) NOT NULL, token VARCHAR(255), phonenumer VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, FOREIGN KEY (RoleID) REFERENCES roles(RoleID)) ';
        return con.querySync(sql);
    }
}
module.exports = UserModel