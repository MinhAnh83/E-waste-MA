const express = require("express")
const router = express.Router()
const UserController = require("../controller/user.controller")
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", UserController.createUser)
router.post("/edit", UserController.editUser)

router.get("/get",  UserController.getUsers)

module.exports = router;