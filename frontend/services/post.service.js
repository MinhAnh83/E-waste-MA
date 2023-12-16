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

    static getDetailPost = async ({ post_id }) => {
        let url = `/api/post/get/detailpost?post_id= ${post_id}`
   
        return await Axios.get(url)
    }
    static getMyPost = async ({ userid }) => {
        let url = '/api/post/get/myposts?'
        if (userid) url = url + `user_id=${userid}`
        return await Axios.get(url)
    }
    static updatePost = async ({ name, content, image, expect_price, items, status,post_id }) => {
        let url = '/api/post/update'
        return await Axios.post(url,{name, content, image, expect_price, items, status, post_id})
    }
    static movetoTrash = async ({ post_id }) => {
        let url = '/api/post/movetotrash?'
        if (post_id) url = url + `post_id=${post_id}`
        return await Axios.post(url)
    }
    static outTrash = async ({ post_id }) => {
        let url = '/api/post/outtrash?'
        if (post_id) url = url + `post_id=${post_id}`
        return await Axios.post(url)
    }
    static deletePost = async ({post_id}) => {
            let url = '/api/post/delete?'   
            if (post_id) url = url + `post_id=${post_id}`
            return await Axios.post(url)
        }
    

}

module.exports = PostService