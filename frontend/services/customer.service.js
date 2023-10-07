'use strict'

import Axios from '@/helper/axios.helper'

class CustomerService {

    static login = async (email, password) => {
        return await Axios.post('/api/customer/login', { email, password })
    }
    
    static signup = async (fullname, email, password) => {
        console.log(`data:::`, fullname, email, password)
        return await Axios.post('/api/customer/signup', { fullname, email, password })
    }
}

module.exports = CustomerService