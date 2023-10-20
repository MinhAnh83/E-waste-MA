'use strict'

import Axios from '@/helper/axios.helper'

class PostService {
    static createPost = async ({ name, user_id, image, content, expect_price }) => {
        return await Axios.post('/api/post/create', { name, user_id, image, content, expect_price })
    }
    static getPost = async ({ limit, offset }) => {
        let url = '/api/post/get?'
        if (limit) url = url + `limit=${limit}&`
        if (offset) url = url + `offset=${offset}&`
        return await Axios.get(url)
    }

    static getMyPost = async ({ userid }) => {
        let url = '/api/post/get/myposts?'
        if (userid) url = url + `user_id=${userid}`
        return await Axios.get(url)
    }
}

module.exports = PostService