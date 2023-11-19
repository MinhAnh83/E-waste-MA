'use strict'


const { con } = require('../model/index')
class PostModel {
    static create = async ({user_id, name, content, image, expect_price, items,status='draft'}) => {
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO posts SET ?', {
                user_id, name, content, image, expect_price, items,status,
                createAt: new Date(), updateAt: new Date(), 
            }, function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        })
    }
    static updatePost = async ({ name, content, image, expect_price, items,status='draft', post_id}) => {
        return new Promise((resolve, reject) => {
            var nowdate = new Date();
            con.query('UPDATE posts SET name= ? ,content= ? ,image= ? ,expect_price= ? ,items= ? , status= ?, updateAt =? WHERE post_id = ?', [  
                 name, content, image, expect_price, items,status, new Date(), post_id]
            , function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        })
    }
    static getPosts = async ({limit, offset, sortType='DESC'}) => {
        return new Promise((resolve, reject) => {
            let query=`SELECT * FROM posts INNER JOIN  (SELECT id, fullname, email, phonenumber, address, role_id, image as user_image FROM users) u ON posts.user_id=u.id`
            query = query + ` ORDER BY updateAt ${sortType}`
            if(limit) query = query + ` LIMIT ${limit}`
            if (offset) query = query + ` OFFSET ${offset}`
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }
    static getDetailPost = async ({post_id}) => {
        return new Promise((resolve, reject) => {
            let query=`SELECT * FROM posts  INNER JOIN  (SELECT id, fullname, email, phonenumber, address, role_id, image as user_image FROM users) u ON posts.user_id=u.id WHERE post_id = ${post_id}`
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }
    static movetoTrash = async ({post_id}) => {
        return new Promise((resolve, reject) => {
            let query=`UPDATE posts SET is_deleted= 1 WHERE post_id= ? `
            con.query(query,[post_id], function (error, results) {
                if (error) reject(error);
                resolve(results)
            })
        })
    }

    static outTrash = async ({post_id}) => {
        return new Promise((resolve, reject) => {
            let query=`UPDATE posts SET is_deleted= 0 WHERE post_id= ? `
            con.query(query,[post_id], function (error, results) {
                if (error) reject(error);
                resolve(results)
            })
        })
    }
    static deletePost = async (post_id) => {
        return new Promise((resolve, reject) => {
            let query=`DELETE FROM posts WHERE post_id = ?`
            con.query(query,[post_id], function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }
    static getMyPosts = async ({user_id}) => {
        return new Promise((resolve, reject) => {
            let query='SELECT * FROM posts INNER JOIN  (SELECT id, fullname, email,  role_id, image as user_image FROM users) u ON posts.user_id=u.id WHERE user_id = ?'
             con.query(query,[user_id], function (error, results) { 
                // truyen user_id là array -truyền array
                if (error) reject(error);

                resolve(results)
            })
        })
    }
    static inittableToDb= async()=>{
        const sql=`CREATE TABLE IF NOT EXISTS posts (post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            user_id INT NOT NULL,
             name VARCHAR(255) NOT NULL, 
             image VARCHAR(255) NOT NULL ,
             content TEXT, 
              expect_price DOUBLE , 
              items TEXT, 
        approve_request INT , 
        status ENUM('draft', 'publish', 'close'), 
        is_deleted BOOLEAN DEFAULT false,
        createAt DATETIME,
        updateAt DATETIME,
         FOREIGN KEY (user_id) REFERENCES users(id))`
        return con.querySync(sql)
            }
}
module.exports=PostModel