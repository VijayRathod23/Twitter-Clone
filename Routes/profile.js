const express = require("express")
const app = express();
const router = express.Router()
const mult = require('../multer/multer')


const { profile,edit_profile,edit_profile_post,delete_tweet} = require("../Controller/profilecontroller");






router.post('/edit_profile',mult.upload.single('profile'),edit_profile_post);
router.get('/edit_profile',edit_profile);
// router.get('/logout',logout);
router.get('/profile',profile);
router.get('/delete_tweet',delete_tweet);



module.exports = router
