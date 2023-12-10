const express = require("express")
const router = express.Router()
const MessageController = require("../controller/message.controller")
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", MessageController.createMessage)
router.get("/getbypost", MessageController.getMessageByPost)
router.get("/getbyuser", MessageController.getAllMessageByUser)
router.get("/getbyid", MessageController.getMessageById)
// router.post("/edit", RoleController.editRole)



module.exports = router;