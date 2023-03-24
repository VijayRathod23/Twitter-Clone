const express = require("express")
const app = express();
const router = express.Router()

const { post_rm_follower, post_Unfollow, postfollower, postfollow, follow, newfollow } = require('../Controller/followcontroller')

router.get('/post_rm_follower', post_rm_follower);
router.get('/post_Unfollow', post_Unfollow);
router.get('/postfollower', postfollower);
router.get('/postfollow', postfollow);
router.get('/follow', follow);
router.get('/newfollow', newfollow);




module.exports = router