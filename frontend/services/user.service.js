'use strict'

import Axios from '@/helper/axios.helper'

class UserService {

    static login = async (email, password) => {
        return await Axios.post('/api/user/login', { email, password })
    }
    
    static signup = async ( email, password, fullname, phonenumer, address, image) => {
        console.log(`data:::`, fullname, email, password)
        return await Axios.post('/api/customer/signup', {  email, password, fullname, phonenumer, address, image })
    }
}

module.exports = UserService