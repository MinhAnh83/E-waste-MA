'use strict'


const { con } = require('../model/index')
class UserModel {
    static createUser = async ({ email, password, fullname, phonenumber, address ,role_id}) => {
        console.log('init')
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO users SET ? ', {email, password, fullname, phonenumber, address,  role_id} ,
                function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        reject(error)
                    }
                    resolve(results)
                })
        })
    }
    static getUser = async ({user_id}) => {
        return new Promise((resolve, reject) => {
            let query ='SELECT * FROM users'
            if(user_id) query = query + ` WHERE id=${user_id}`
            con.query(query, function (error, results, fields) {
                if (error) reject(error)

                resolve(results)
            })
        })
    }
    static editUser = async ({ email, password, fullname, phonenumber, address, image, id }) => {
        return new Promise((resolve, reject) => {
            con.query('UPDATE users SET email = ?, fullname =?, phonenumber =?, address =?, image=? WHERE id = ? '
                , [email, fullname, phonenumber, address, image, id],
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
                resolve(results[0])
            })
        })
    }
    static getUserWithRole =async(userId)=>{
        return new Promise((resolve, reject) => {
             con.query("SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE id = ?", [userId], function(error, results, fields){
                 if(error) reject(error)
                 resolve(results)
             })
         })
     }
     static updateToken = async ({ id, token }) => {
        return new Promise((resolve, reject) => {
            con.query('UPDATE users SET token = ? WHERE id = ?', [token, id], 
            function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        })
    }
    static initTableToDB = async () => {
        var sql = 'CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  role_id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, fullname VARCHAR(255) NOT NULL, token VARCHAR(255), phonenumber VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, FOREIGN KEY (role_id) REFERENCES roles(role_id)) ';
        return con.querySync(sql);
    }
}
module.exports = UserModel