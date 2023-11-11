'use strict'

const PostModel = require('../model/post.repo')

class PostController {

    static createPost = async (req, res, next) => {
        try {
            const { user_id, name, content, image, expect_price, items, status } = req.body;
            const result = await PostModel.create({

                user_id, name, content, image, expect_price, items, status
            })
            if (!result) throw new Error("Can't create post");
            res.status(200).json({
                message: 'Create post success!',
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

    static updatePost = async (req, res, next) => {
        try {
            
            const {  name, content, image, expect_price, items, status,post_id } = req.body;
            const result = await PostModel.updatePost({

                 name, content, image, expect_price, items, status,post_id
            })
            if (!result) throw new Error("Can't update post");
            res.status(200).json({
                message: 'Update success!',
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
    static getPosts = async (req, res, next) => {
        try {
            const { limit, offset, sortType } = req.query
            const results = await PostModel.getPosts({ limit, offset , sortType})
            // console.log(results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get posts success!',
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
    static movetoTrash=async(req,res,next)=>{
        try {
            const {post_id} = req.query
            const results = await PostModel.movetoTrash({post_id})
            // console.log(results)
            if (!results) throw new Error("Don't move the post to trash ");
            res.status(200).json({
                message: 'move post to trash success!',
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

    static outTrash=async(req,res,next)=>{
        try {
            const {post_id} = req.query
            const results = await PostModel.outTrash({post_id})
            // console.log(results)
            if (!results) throw new Error("Don't out trash ");
            res.status(200).json({
                message: 'out trash success!',
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

    static deletePost = async (req, res, next) => {
        try {
            const {post_id} = req.query
            const results = await PostModel.deletePost(post_id)
            // console.log(results)
            if (!results) throw new Error("Don't delete data");
            res.status(200).json({
                message: 'delete post success!',
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
    static getMyPosts = async (req, res, next) => {
        try {
            const { user_id } = req.query
            console.log(user_id)
            const results = await PostModel.getMyPosts({user_id: parseInt(user_id)})
            console.log(results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get posts success!',
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

}
module.exports = PostController
