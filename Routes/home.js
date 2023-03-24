const express = require("express")
const app = express();
const router = express.Router()
const mult = require('../multer/multer')

const {home, tweet ,like,search_profile,search} = require('../Controller/homecontroller')



// router.route('/signup').get(signup)
router.get('/home',home);
router.post('/like',like);
router.get('/search_profile',search_profile);
router.get('/search',search);
router.post('/tweet',mult.upload2.single('media'),tweet);



module.exports = router
