'use strict'

import Axios from '@/helper/axios.helper'

class UserService {

    static login = async (email, password) => {
        return await Axios.post('/api/user/login', { email, password })
    }
    static getUser = async({user_id})=>{
        let url = '/api/user/get?'
        if(user_id) url=url+`user_id=${user_id}`
        return await Axios.get(url)
    }
    static signup = async ( fullname, email, password , phonenumber, address, role_id) => {
        console.log(`data:::`, fullname, email, password)
        return await Axios.post('/api/user/signup', {  fullname, email, password , phonenumber, address, role_id })
    }
    static editUser = async ({email, fullname, phonenumber, address, image, id}) => {

        return await Axios.post('/api/user/edit',{ email, fullname, phonenumber, address, image, id})
    }
}

module.exports = UserService