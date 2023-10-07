'use strict'
const { products } = require('../data')
const JWT = require('jsonwebtoken')
const UserModel = require('../model/user.repo')
const SECRECT_KEY = '123'

class UserController {
    static signUp = async (req, res, next) => {
        try {
            // 1.
            const {  email, password, fullname, phonenumer, address, image ,RoleID} = req.body
            if(!password || !email || !fullname ) throw new Error('Inputs are not valid!!')
            // 2.
            const foundUser = await UserModel.getUserByEmail(email)
            if(foundUser) throw new Error(`User existing`)
            // 3.
            const passwordCipher = CryptoJS.AES.encrypt(password, SECRECT_KEY).toString();
            // 4.
            const results = await UserModel.createUser({ 
                email: email, 
                fullname: fullname, 
                password: passwordCipher, 
                phonenumer: phonenumer, 
                address: address, 
                image: image ,
                RoleID:RoleID
            })

            res.status(200).json({
                code: 200,
                message: 'Create user success!',
                data: results
            })
        } catch (err) {
            res.status(500).json({
                code: 500,
                message: 'Error:::',
                error: err
            })
        }
    }

    static getUsers = async (req, res, next) => {
        try {

            const results = await UserModel.getUser()
            // console.log(results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get Users success!',
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
    static createUser = async (req, res, next) => {
        try {
            const { email, password, fullname, phonenumer, address, image } = req.body;
            const {RoleID} =req.body
            const result = await UserModel.create({

                email: email
                , password: password
                , fullname: fullname
                , phonenumer:phonenumer
                , address: address
                , image: image,
                RoleID:RoleID
            })
            if (!result) throw new Error("Can't create User");
            res.status(200).json({
                message: 'Create Users success!',
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

    static editUser = async (req, res, next) => {
        try {
            const {  email, password, fullname, phonenumer, address, image } = req.body;
            const { UserId } = req.query
            const result = await UserModel.editUser({
                email: email
                , password: password
                , fullname: fullname
                , phonenumer:phonenumer
                , address: address
                , image: image,
                  id: UserId
            })
            if (!result) throw new Error("Can't create User");
            res.status(200).json({
                message: 'Create Users success!',
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
}
module.exports = UserController
