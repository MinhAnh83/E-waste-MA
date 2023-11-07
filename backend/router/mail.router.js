const express= require('express');
const router=express.Router();
const MailController= require('../controller/mail.controller')


router.post("/create", MailController.sendMail)

module.exports=router;