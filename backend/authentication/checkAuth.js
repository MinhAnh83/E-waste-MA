'use strict'
const JWT = require('jsonwebtoken')
const   UserModel = require('../model/user.repo')


const SECRECT_KEY = '123'
const SECRECT_KEY_SHOP = 'abc'

const authentication = (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        if(!token ) throw new Error('Authen error')
        const verifyToken = JWT.verify(token, SECRECT_KEY)
        const { email, id } = verifyToken
        UserModel.getUserByEmail(email).then((foundUser) => {
            if(!foundUser) throw new Error('Authen fail')
            req.headers["user-id"] = foundUser.id
            req.headers["user-email"] = foundUser.email
            next()
        }).catch(() => {
            throw new Error('Authen fail')
        })
    } catch(err) {
        res.status(200).json({
            code: 500,
            message: 'Authen Error:::',
            error: err
        })
    }
}



module.exports = {
    authentication
}