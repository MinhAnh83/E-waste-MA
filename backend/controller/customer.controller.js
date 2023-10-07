'use strict'

const CryptoJS = require("crypto-js");
const JWT = require('jsonwebtoken')
const CustomerModel = require('../model/customer.repo')

const SECRECT_KEY = '123'

class CustomerController {

    /**
     * 1. kiểm tra input có valid không
     * 2. kiểm tra username có hợp lệ
     * 3. băm password
     * 4. save to database
     */
    static signUp = async (req, res, next) => {
        try {
            // 1.
            const { password, email, fullname } = req.body
            if(!password || !email || !fullname) throw new Error('Inputs are not valid!!')
            // 2.
            const foundCustomer = await CustomerModel.getCustomerByEmail(email)
            if(foundCustomer) throw new Error(`Customer existing`)
            // 3.
            const passwordCipher = CryptoJS.AES.encrypt(password, SECRECT_KEY).toString();
            // 4.
            const results = await CustomerModel.create({ 
                email: email, 
                fullname: fullname, 
                password: passwordCipher 
            })

            res.status(200).json({
                code: 200,
                message: 'Create customer success!',
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
            const foundCustomer = await CustomerModel.getCustomerByEmail(email)
            // 2.
            if(!foundCustomer) throw new Error('User not exist!')
            // 3.
            const bytes = CryptoJS.AES.decrypt(foundCustomer.password, SECRECT_KEY)
            const passwordText = bytes.toString(CryptoJS.enc.Utf8)
            // 4.
            if(password !== passwordText) throw new Error('Password not match')
            // 5.
            const token = await JWT.sign({ id: foundCustomer.id, email: foundCustomer.email }, SECRECT_KEY, { expiresIn: '12h' })
            // 6.
            const updateResult = await CustomerModel.updateToken({ id: foundCustomer.id, token: token })
            if(!updateResult) throw new Error('Update token fail')
            // 7.
            res.status(200).json({
                code: 200,
                message: 'Login Ok!!!',
                data: {
                    result: foundCustomer,
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

    static getCustomer = async (req, res, next) => {

    }

    static authenCustomer = async (req, res, next) => {
        const customerId = req.headers["customer-id"]
        const customerEmail = req.headers["customer-email"]
        console.log(req.headers["customer-id"])
        
        res.json({
            customerId, customerEmail
        })
    }

}

module.exports = CustomerController