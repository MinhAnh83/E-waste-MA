const express = require("express")
const router = express.Router()
const ShopController = require('../controller/shop.controller')
const { authenticationShop } = require('../authentication/checkAuth')

router.get('/authen', authenticationShop, ShopController.getDataAuthen)
router.post("/", ShopController.createShop)
router.post("/login", ShopController.login)

module.exports = router;