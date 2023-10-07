 'use strict'

const { connection } = require('./index') // Destructuring
const CustomerModel = require('../model/customer.repo')
const CategoryModel = require('../model/category.repo')
const ProductModel = require('../model/product.repo')
const ShopModel = require('../model/shop.repo')
const UserModel = require('../model/user.repo')
const RoleModel = require('../model/role.repo')


connection(async () => {
    try {
        await ShopModel.initTableToDB()
        await CustomerModel.initTableToDB() // promise
        await CategoryModel.initTableToDB()
        await ProductModel.initTableToDB()
        await RoleModel.initTableToDB()
        await UserModel.initTableToDB()
        console.log('All tables created success:::::')
    } catch(err) {
        console.log(err)
    }
    // Chạy xong thoát chương trình
    process.exit()
})