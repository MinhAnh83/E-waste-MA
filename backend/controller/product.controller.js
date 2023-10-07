'use strict'
const { products } = require('../data')
const JWT = require('jsonwebtoken')
const ProductModel = require('../model/product.repo')

class ProductController {

    static getProducts = async (req, res, next) => {
        try {

            const results = await ProductModel.getProducts()
            // console.log(results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get product success!',
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

    static createProduct = (req, res, next) => {
        
        res.json({
            message: 'Get data success!',
            data: res.body
        })
    }
    static getProductById = async (req, res, next) => {
        try {
            const { productId } = req.query
            const result = await ProductModel.getProductById(productId)
            console.log(result)
            res.status(200).json(
                {
                    message: 'Get product success!',
                    data: result
                }

            )


        }
        catch (err) {
            res.status(500).json(
                {
                    code: 500,
                    message: 'Error',
                    error: err.message
                }
            )
        }

    }
    static getCategoryById = async (req, res, next) => {
        try {
            const id = req.params.id
            console.log(id)
            const result = await ProductModel.getCategoryById(id)
            console.log(result)
            res.status(200).json({
                message: 'Get category of product success!',
                data: result

            })
        }
        catch (err) {
            res.status(500).json({
                code: 500,
                message: 'Error',
                error: err.message
            })
        }
    }
    static searchProduct =async(req,res,next)=>{
        try{
            const { text } = req.query
            const result = await ProductModel.searchProduct(text)
            console.log(result)
            res.status(200).json(
                {
                    message: 'Get product success!',
                    data: result
                }

            )

        }
        catch (err) {
            res.status(500).json(
                {
                    code: 500,
                    message: 'Error',
                    error: err.message
                }
            )
        }
    }
   
}


module.exports = ProductController