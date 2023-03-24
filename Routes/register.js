const express = require("express")
const app = express();
const router = express.Router()

const {signup ,signup_post} = require('../Controller/registerController')



// router.route('/signup').get(signup)
router.get('/signup',signup);

router.post('/signup',signup_post);


module.exports = router
