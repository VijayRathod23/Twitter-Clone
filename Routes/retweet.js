const express = require("express")
const app = express();
const router = express.Router()


const {retweet,quote_tweet, retweet_cnt} = require('../Controller/retweetcontroller')
let multer = require('../multer/multer');

router.get('/retweet',retweet);
router.post("/quote_tweet", multer.upload2.single('media'),quote_tweet);
router.get("/retweet_cnt",retweet_cnt)




module.exports = router