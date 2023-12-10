'use strict'

const MessageModel = require('../model/message.repo');
const PostModel = require('../model/post.repo')

class MessageController {
    
    static createMessage = async (req, res, next) => {
        try {
            const { buyerId, salerId, postId, content } = req.body;
            const result = await MessageModel.createMessage({

                buyerId, salerId, postId, content
            })
            if (!result) throw new Error("Can't create message");
            res.status(200).json({
                message: 'Create message success!',
                data: result
            })


        }
        catch (err) {
            res.status(500).json({
                code: 500,
                message: 'Error:::',
                error: err.message
            })
        }
    }

 
    static getMessageByPost = async (req, res, next) => {
        try {
            const { buyerId, salerId, postId } = req.query
            const results = await MessageModel.getMessageByPost({ buyerId, salerId, postId})
             console.log('hh',results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get message success!',
                data: results
            })

        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                code: 500,
                message: 'Error::: c',
                error: err.message
            })
        }


    }
    static getAllMessageByUser = async (req, res, next) => {
        try {
            const results = await MessageModel.getAllMessageByUser({ ...req.query })
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get message success!',
                data: results
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                code: 500,
                message: 'Error::: c',
                error: err.message
            })
        }
    }

  

}
module.exports = MessageController
