'use strict'


const { con } = require('./index')
class RoleModel {
    static create = async ({accessApp, name, description}) => {
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO roles SET ?', {
                accessApp, name, description
            }, function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        })
    }

    static getRole = async () => {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM roles  ', function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }
    static editRole=async({accessApp, name, description,id})=>{
        return new Promise((resolve,reject)=>{
            con.query('UPDATE roles SET accessApp=? name=? description=? WHERE RoleID = ?',[accessApp, name, description,id],
            function(error, results){
                if(error) reject(error);

                resolve(results)
            })
        })
    }
    static initTableToDB = async () => {
        var sql = 'CREATE TABLE IF NOT EXISTS roles (role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255)  NOT NULL,  description TEXT,  accessApp VARCHAR(255)  NOT NULL)';
        return con.querySync(sql);
    }

}
module.exports = RoleModel