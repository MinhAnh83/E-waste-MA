const express = require("express")
const router = express.Router()
const ProductRouter = require("./product.router")
const CustomerRouter = require("./customer.router")
const ShopRouter = require('./shop.router')
const RoleRouter=require('./role.router')
const UserRouter=require('./user.router')

router.use('/product', ProductRouter);
router.use('/customer', CustomerRouter);
router.use('/shop', ShopRouter);
router.use('/role', RoleRouter);
router.use('/user', UserRouter);
module.exports = router;