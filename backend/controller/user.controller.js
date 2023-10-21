'use strict'
const { products } = require('../data')
const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')
const UserModel = require('../model/user.repo')
const SECRECT_KEY = '123'

class UserController {
    static signUp = async (req, res, next) => {
        try {
            // 1.
            const {  fullname, email, password , phonenumber, address, role_id} = req.body
            if(!password || !email || !fullname || !phonenumber || !role_id) throw new Error('Inputs are not valid!!')
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
                phonenumber: phonenumber, 
                address: address, 
                role_id:role_id
            })
            console.log(2)
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

    /**
     * 1. tìm customer theo email
     * 2. nếu ko có => ném lỗi
     * 3. nếu có => giả mã password trong db
     * 4. so sánh mã vừa bắm có bằng với mã khác gửi không?
     * 5. nếu khớp => tạo token
     * 6. update token cho customer trong db
     * 7. cho đăng nhập và trả token cho client
     */
    static logIn = async (req, res, next) => {
        try {
            const { email, password } = req.body
            // 1.
            const foundUser = await UserModel.getUserByEmail(email)
            // 2.
            if(!foundUser) throw new Error('User not exist!')
            // 3.
            const bytes = CryptoJS.AES.decrypt(foundUser.password, SECRECT_KEY)
            const passwordText = bytes.toString(CryptoJS.enc.Utf8)
            // 4.
            if(password !== passwordText) throw new Error('Password not match')
            // 5.
            const token = await JWT.sign({ id: foundUser.id, email: foundUser.email }, SECRECT_KEY, { expiresIn: '12h' })
            // 6.
            const updateResult = await UserModel.updateToken({ id: foundUser.id, token: token })
            if(!updateResult) throw new Error('Update token fail')
            // 7.
            res.status(200).json({
                code: 200,
                message: 'Login Ok!!!',
                data: {
                    result: foundUser,
                    token
                }
            })

        } catch(err) {
            res.status(500).json({
                code: 500,
                message: 'Error:::',
                error: err
            })
        }
    }

  

    static authenCustomer = async (req, res, next) => {
        const userId = req.headers["user-id"]
        const userEmail = req.headers["user-email"]
        console.log(req.headers["user-id"])
        const userRole =req.headers["user-role"]
        
        res.json({
            userId, userEmail,userRole
        })
    }
    static getUserWithRole = async (req, res, next) => {
        const userId = req.headers["user-id"]
        // const customerEmail = req.headers["customer-email"]
        // const customerRole =req.headers["customer-role"]
        const result = await UserModel.getUserWithRole(parseInt(userId))
        res.json(result)
    }
}
module.exports = UserController
