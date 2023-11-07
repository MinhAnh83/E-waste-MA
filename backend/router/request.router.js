const express= require('express');
const router=express.Router();
const RequestController= require('../controller/request.controller')

router.get("/get", RequestController.getRequest)
router.post("/create", RequestController.createRequest)

module.exports=router;