const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
const { upload } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')
const postsServices = require("../posts/posts.http")


router.route('/') //* /api/v1/users/
    .get(userServices.getAll)


router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,userServices.editMyUser)
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}), upload.single('profile_img'), userServices.postProfileImg)
    //.get()

router.route('/me/posts')
    .get(passport.authenticate('jwt', {session: false}), postsServices.getMyById)
    .post(passport.authenticate('jwt', {session: false}),postsServices.createPost)


router.route('/me/posts/:id')
.get(passport.authenticate('jwt', {session: false}), postsServices.getMyByIdUser)
.put(passport.authenticate('jwt', {session: false}), postsServices.editMyPost)
.delete(passport.authenticate('jwt', {session: false}), postsServices.removeMyPost)
   
    




router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,userServices.edit)


exports.router = router