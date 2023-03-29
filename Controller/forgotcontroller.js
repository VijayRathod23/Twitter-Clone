
var express = require('express');
const { query, response } = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const con = require('../Connection/connection')
const asyncHandler = require("express-async-handler");
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
require("dotenv").config();
const user = process.env.user; 

var trasporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    }
    });


async function getdata(sql) {
    return new Promise((res, rej) => {
        con.query(sql, (err, data) => {
            if (err) throw err;
            res(data);
        })
    })
}


const forget_pass = asyncHandler( (req, res) => {
    res.render('forget_pass');
})
const get_otp = asyncHandler(async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const sql = `select * from users where email = '${email}' `;
    const result = await getdata(sql);
    console.log(result[0]);
    // Generate a random 4-digit number
    var randomNum = Math.floor(Math.random() * 10000);
    var otp = ("000" + randomNum).slice(-4);
    console.log(otp); // Prints a random 4-digit number, e.g. "1234"
    var otpsql = `update users set otp='${otp}' where email = '${email}'`;

    if (result[0]) {
        var otpResult = await getdata(otpsql);
        let info = await trasporter.sendMail({
            from: 'twitter.clone.web@gmail.com',
            to: `${email}`,
            subject: 'Reset Password mail',
            html: `<h3>You Otp for reset password is <h2>${otp}</h2></h3>`
        });
        if (info) {

        } else {
            return res.send("error sending mail!")
        }
        const emailToken = jwt.sign(email, "email");
        res.cookie("email", emailToken);

        res.json({ exists: true });
    }
    else {
        res.json({ exists: false });
    }
})
const otpscreen = asyncHandler((req, res) => {
    res.render('otpscreen')
})
const verify_otp = asyncHandler(async (req, res) => {
    const userOtp = req.query.otp;
    console.log(userOtp);
    const emailToken = req.cookies.email;
    const emailData = jwt.verify(emailToken, "email");
    console.log("email", emailData);
    var sql = `select otp from users where email = '${emailData}'`;
    var otp = await getdata(sql);
    const varifyOtp = otp[0].otp;
    console.log(varifyOtp);
    if (userOtp == varifyOtp) {
        console.log('otp matched');
        return res.redirect('/change_pass');
    } else {
        res.send("Invalid Otp")
    }

})
const change_pass = asyncHandler((req, res) => {
    res.render('change-pass')
})
const save_pass = asyncHandler(async (req, res) => {
    const newpass = req.body.newpass;
    const newhash = await bcrypt.hash(newpass, 10);
    console.log(newpass);
    console.log(newhash);
    const emailToken = req.cookies.email;
    const emailData = jwt.verify(emailToken, "email");
    const sql = `update users set password = '${newhash}' where email = '${emailData}'`;
    const result = await getdata(sql);
    console.log('pass change');
    if (result.changedRows == 1) {
        res.clearCookie("email");
        res.redirect('/login')
    } else {
        res.send("Error in changing password!")
    }

})




module.exports = { forget_pass, save_pass, change_pass, verify_otp, otpscreen, get_otp }