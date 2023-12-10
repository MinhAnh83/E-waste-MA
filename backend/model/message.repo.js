const { con } = require('../model/index')
class MessageModel
{ 
    static createMessage= async ({ buyerId, salerId, postId, content }) => {
    return new Promise(async (resolve, reject) => {
        const findMsg = await MessageModel.getMessageByPost({ buyerId, salerId, postId })
        console.log('Data:::::::::::::::', findMsg)
        if(findMsg && findMsg.length > 0) {
            resolve(findMsg[0])
        } else {
            const contentInit = {
                messages: [
                    {
                        userId: buyerId,
                        text: "Hello!! Tôi muốn chat với bạn qua bài viết này...",
                        timestamp: new Date().getTime()
                    }
                ]
            }
            const contentStr = JSON.stringify(contentInit)
            con.query('INSERT INTO messages SET ?', {
                post_id: postId, buyer_id: buyerId, saler_id: salerId, content: contentStr,
                createdAt: new Date(), updatedAt: new Date()
            }, function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        }
    })
}
// static updateMessage = async ({ messageId, messageObj }) => {
//     return new Promise(async (resolve, reject) => {
//         const msgResult = await MessageModel.getMessageById(messageId)
//         console.log(msgResult)
//         if(msgResult && msgResult[0]) {
//             let messageResult = msgResult[0]
//             if (!messageResult.contentObj) {
//                 messageResult.contentObj = {};
//                 messageResult.contentObj.messages = [];
//             }

//             messageResult.contentObj = JSON.parse(messageResult.content)
//             messageResult.contentObj.messages.push(messageObj)
//             const newContent = JSON.stringify(messageResult.contentObj)
//             con.query('UPDATE messages SET content = ? WHERE message_id = ?', [newContent, messageId], 
//             function (error, results, fields) {
//                 if (error) reject(error);
//                 resolve(results)
//             });
//         }
//     })
// }
static updateMessage = async ({ messageId, messageObj }) => {
    return new Promise(async (resolve, reject) => {
        const msgResult = await MessageModel.getMessageById(messageId);
        console.log(msgResult);

        if (msgResult && msgResult[0]) {
            let messageResult = msgResult[0];

            if (!messageResult.content) {
                // If content is not defined, initialize it with an empty object
                messageResult.content = '{}';
            }

            messageResult.contentObj = JSON.parse(messageResult.content);

            if (!messageResult.contentObj.messages) {
                // If messages is not defined, initialize it with an empty array
                messageResult.contentObj.messages = [];
            }

            messageResult.contentObj.messages.push(messageObj);

            const newContent = JSON.stringify(messageResult.contentObj);

            con.query('UPDATE messages SET content = ? WHERE message_id = ?', [newContent, messageId], 
            function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        } else {
            reject(new Error('Message not found'));
        }
    });
}
    static getMessageByPost = async ({buyerId, salerId, postId}) => {
        return new Promise((resolve, reject) => {
            let query=`SELECT * FROM messages
             INNER JOIN  (SELECT post_id, user_id as post_userId, name as post_name, content as post_content, image as post_image, expect_price as post_expectprice, approve_request as post_approve_request, status as post_status FROM posts) p ON messages.post_id=p.post_id
             INNER JOIN (select id as buyer_id, fullname as buyer_fulname, email as buyer_email, phonenumber as buyer_phonenumber, address as buyer_address,role_id as buyer_role,image as buyer_image from users) u ON messages.buyer_id=u.buyer_id
             INNER JOIN (select id as saler_id, fullname as saler_fullname, email as saler_email, phonenumber as saler_phonenumber, address as saler_address,role_id as saler_role,image as saler_image from users) a ON messages.saler_id=a.saler_id
             WHERE messages.post_id =${postId} AND messages.buyer_id=${buyerId} AND messages.saler_id=${salerId}
             `
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }
    static getAllMessageByUser = async ({ userId, role }) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * 
            FROM messages 
            INNER JOIN (select post_id, user_id as post_userId, name as post_name, content as post_content, image as post_image, expect_price as post_expectprice, approve_request as post_approve_request, status as post_status from posts) p ON messages.post_id = p.post_id
            INNER JOIN (select id as buyer_id, fullname as buyer_fullname, email as buyer_email, phonenumber as buyer_phonenumber, address as buyer_address, role_id as buyer_role, image as buyer_image from users) b ON messages.buyer_id = b.buyer_id
            INNER JOIN (select id as saler_id, fullname as saler_fullname, email as saler_email, phonenumber as saler_phonenumber, address as saler_address, role_id as saler_role, image as saler_image from users) s ON messages.saler_id = s.saler_id
            `
            switch(role) {
                case 'saler':
                    query += ` WHERE messages.saler_id = ${userId}`
                    break
                case 'buyer':
                    query += ` WHERE messages.buyer_id = ${userId}`
                    break
                default:
                    reject('Nothing!!')
            }
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }
    static getMessageById = async (messageId) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * 
            FROM messages 
            INNER JOIN (select post_id, user_id as post_userId, name as post_name, content as post_content, image as post_image, expect_price as post_expectprice, approve_request as post_approve_request, status as post_status from posts) p ON messages.post_id = p.post_id
            INNER JOIN (select id as buyer_id, fullname as buyer_fullname, email as buyer_email, phonenumber as buyer_phonenumber, address as buyer_address, role_id as buyer_role, image as buyer_image from users) b ON messages.buyer_id = b.buyer_id
            INNER JOIN (select id as saler_id, fullname as saler_fullname, email as saler_email, phonenumber as saler_phonenumber, address as saler_address, role_id as saler_role, image as saler_image from users) s ON messages.saler_id = s.saler_id
            WHERE messages.message_id = ${messageId}
            `
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }
  static initTableToDB=async()=>{
    var sql=` CREATE TABLE IF NOT EXISTS messages(
        message_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        post_id INT NOT NULL,
        buyer_id INT NOT NULL,
        saler_id INT NOT NULL,
        content TEXT,
        isDeleted BOOLEAN DEFAULT false,
        createdAt DATETIME,
        updatedAt DATETIME,
        FOREIGN KEY (post_id) REFERENCES posts(post_id),
        FOREIGN KEY (buyer_id) REFERENCES users(id),
        FOREIGN KEY (saler_id) REFERENCES users(id)
    ) `;
    return con.querySync(sql)
  }
}
module.exports = MessageModel