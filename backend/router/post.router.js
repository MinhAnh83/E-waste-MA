const express = require("express")
const router = express.Router()
const PostController = require("../controller/post.controller")
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", PostController.createPost)
router.post("/delete", PostController.deletePost)
router.post("/movetotrash", PostController.movetoTrash)
router.post("/outtrash", PostController.outTrash)
router.post("/update", PostController.updatePost)
// router.post("/edit", RoleController.editRole)

router.get("/get",  PostController.getPosts)
router.get("/get/myposts", PostController.getMyPosts)

module.exports = router;