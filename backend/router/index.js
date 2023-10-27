const express = require("express")
const router = express.Router()
// const ProductRouter = require("./product.router")
// const CustomerRouter = require("./customer.router")
// const ShopRouter = require('./shop.router')
const RoleRouter=require('./role.router')
const UserRouter=require('./user.router')
const PostRouter = require('./post.router')
const ScrapyardRouter = require('./scrapyard.router')
// router.use('/product', ProductRouter);
// router.use('/customer', UserRouter);
// router.use('/shop', ShopRouter);
router.use('/role', RoleRouter);
router.use('/user', UserRouter);
router.use('/post', PostRouter);
router.use('/scrapyard',ScrapyardRouter)
module.exports = router;