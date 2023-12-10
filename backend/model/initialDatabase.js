 'use strict'

const { connection } = require('./index') // Destructuring

const UserModel = require('../model/user.repo')
const RoleModel = require('../model/role.repo')
const PostModel= require('../model/post.repo')
const ScrapyardModel =require('../model/scrapyard.repo')
const PurchasingPriceModel = require('../model/purchasingprice.repo')
const RequestModel = require('../model/request.repo')
const MessageModel = require('../model/message.repo')
connection(async () => {
    try {
       
        await RoleModel.initTableToDB()
        await UserModel.initTableToDB()
        await PostModel.inittableToDb()
        await ScrapyardModel.initTableToDB()
        await PurchasingPriceModel.inittableToDb()
        await RequestModel.initTableToDB()
        await MessageModel.initTableToDB()
        console.log('All tables created success:::::')
    } catch(err) {
        console.log(err)
    }
    // Chạy xong thoát chương trình
    process.exit()
})