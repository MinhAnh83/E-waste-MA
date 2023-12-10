const express = require("express")
const router = express.Router()
const UserController = require("../controller/user.controller")
const { authentication } = require('../authentication/checkAuth')

router.post("/create", UserController.createUser)
router.post("/edit", UserController.editUser)

router.get("/get",  UserController.getUsers)
router.post("/signup", UserController.signUp)
router.post("/login", UserController.logIn)

router.get("/getalluser", UserController.getAllUserWithRole)
router.get("/authen", authentication, UserController.authenCustomer)
router.post("/edit", authentication, UserController.editUser)
router.get("/getbytoken", authentication, UserController.getUserWithRole)
module.exports = router;