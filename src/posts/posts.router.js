const router = require('express').Router()
const postsServices = require("./posts.http")
const passport = require('passport')



router.route('/') //* /api/v1/posts
.get(postsServices.getAll)

router.route('/:id') 
.get(postsServices.getById)
.post(postsServices.createPost)




    exports.router = router