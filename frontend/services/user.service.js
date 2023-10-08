'use strict'

import Axios from '@/helper/axios.helper'

class UserService {

    static login = async (email, password) => {
        return await Axios.post('/api/user/login', { email, password })
    }
    
    static signup = async ( fullname, email, password , phonenumber, address, role_id) => {
        console.log(`data:::`, fullname, email, password)
        return await Axios.post('/api/user/signup', {  fullname, email, password , phonenumber, address, role_id })
    }
}

module.exports = UserService