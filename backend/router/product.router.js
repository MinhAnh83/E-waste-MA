const express = require("express")
const router = express.Router()
const ProductController = require("../controller/product.controller")
const { authentication } = require('../authentication/checkAuth')


//router.get("/", authentication, ProductController.getProducts)
router.get("/", ProductController.getProducts)
//router.get("/getdata",  ProductController.getProducts
router.get(`/getdetail`, ProductController.getProductById)
router.get(`/category/:id`, ProductController.getCategoryById) 
router.get(`/search`, ProductController.searchProduct) 

router.post("/", ProductController.createProduct)

router.put("/", (req, res) => {
    res.end('Home');
})

router.delete("/", (req, res) => {
    res.end('Home');
})

module.exports = router;