const express = require("express")
const app = express();
const router = express.Router()

const {activate,activate_page2,login ,login_post,find_user} = require('../Controller/logincontroller')



// router.route('/signup').get(signup)
router.get('/activate',activate);
router.get('/activatepage2',activate_page2);

router.get('/login',login);
router.post('/login',login_post);

router.get('/finduser',find_user);


module.exports = router
