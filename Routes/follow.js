const express = require("express")
const app = express();
const router = express.Router()

const { post_rm_follower, post_Unfollow, postfollower, postfollow, follow, newfollow ,search_follow,follow_search} = require('../Controller/followcontroller')

router.get('/post_rm_follower', post_rm_follower);
router.get('/post_Unfollow', post_Unfollow);
router.get('/postfollower', postfollower);
router.get('/postfollow', postfollow);
router.get('/follow', follow);
router.get('/newfollow', newfollow);
router.get('/search_follow', search_follow);
router.get('/follow_search',follow_search);



module.exports = router