const express = require("express")
const app = express();
const router = express.Router()
const mult = require('../multer/multer')

const {home, tweet ,like,search_profile,comment_display,comment,search} = require('../Controller/homecontroller')



// router.route('/signup').get(signup)
router.get('/home',home);
router.post('/like',like);
router.get('/search_profile',search_profile);
router.get('/search',search);
router.post('/tweet',mult.upload2.single('media'),tweet);
router.post('/comment',comment);
router.post('/comment_display',comment_display);

router.post('/comment',comment);
router.post('/comment_display',comment_display);



module.exports = router
