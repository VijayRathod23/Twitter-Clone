const express = require("express")
const app = express();
const router = express.Router()

const {comment,comment_display} = require('../Controller/commentcontroller')

router.post('/comment',comment);
router.post('/comment_display',comment_display);



module.exports = router