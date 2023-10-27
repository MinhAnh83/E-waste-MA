const express = require("express")
const router = express.Router()
const ScrapyardController= require('../controller/scrapyard.controller')
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", ScrapyardController.createScrapyard)


module.exports = router;