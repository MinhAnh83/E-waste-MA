const express = require("express")
const router = express.Router()
const RoleController = require("../controller/role.controller")
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", RoleController.createRole)
router.post("/edit", RoleController.editRole)

router.get("/get",  RoleController.getRoles)

module.exports = router;