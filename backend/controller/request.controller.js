'use strict'
const RequestModel = require('../model/request.repo')

class RequestController {
    static getRequest = async (req, res, next) => {
        try {

            res.status(200).json({
                message: 'Get request ',
                data: results
            })

        }
        catch (err) {
            res.status(500).json({
                code: '500',
                message: 'error  ::',
                error: message.err
            })
        }
    }
    static createRequest = async (req,res,next) => {
        try { 
            const {post_id, user_id, expect_price, comments, status} =req.body;
            const results= await RequestModel.create({post_id, user_id, expect_price, comments, status})
            res.status(200).json({
                code: '200',
                data: results
            })
        }
        catch (err) {
            res.status(500).json({
                code: '500',
                message: 'error::',
                error: message.err
            })

        }
    }

}
module.exports = RequestController