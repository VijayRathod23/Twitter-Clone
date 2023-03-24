const express = require("express")
const app = express();
const router = express.Router()

const { forget_pass, save_pass, change_pass, verify_otp, otpscreen, get_otp } = require('../Controller/forgotcontroller')

router.get('/forget_pass', forget_pass);
router.post('/save_pass', save_pass);
router.get('/change_pass', change_pass);
router.get('/verify_otp', verify_otp);
router.get('/otpscreen', otpscreen);
router.get('/get_otp', get_otp);




module.exports = router