const express = require("express")
const router = express.Router()
const CustomerController = require("../controller/customer.controller")
const { authentication } = require('../authentication/checkAuth')

router.post("/signup", CustomerController.signUp)
router.post("/login", CustomerController.logIn)

router.get("/authen", authentication, CustomerController.authenCustomer)

module.exports = router;