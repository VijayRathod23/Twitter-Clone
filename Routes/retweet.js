const express = require("express")
const app = express();
const router = express.Router()

const {retweet} = require('../Controller/retweetcontroller')

router.get('/retweet',retweet);




module.exports = router