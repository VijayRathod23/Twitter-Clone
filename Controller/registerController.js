var express = require('express');
const { query, response } = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const con = require('../Connection/connection')
const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res) => {
    // const availabletkn = req.session.user;
    // if (availabletkn) {
    //     res.redirect("/home");
    // }
    res.render('signup')
})

// 

async function getdata(sql) {
    return new Promise((res, rej) => {
        con.query(sql, (err, data) => {
            if (err) throw err;
            res(data);
            //rej();
        })
    })
}

// 


const signup_post = asyncHandler(async (req, res) => {
    const { name, email, pwd } = req.body;
    var sql = `select * from users where email = '${email}'`;
    var result = await getdata(sql);

    // console.log("query result" + result);
    if (result.length != 0) {
        return res.send(`User Already registered! please <a href="/login">login</a>`)
    }

    var hashPass = await bcrypt.hash(pwd, 10);

    const activation_token = Math.random().toString(36).substring(2, 15);
    const activationLink = `/activate?token=${activation_token}`;
    // console.log(email);
    var sql = `insert into users(username,email,password,activation_token) values('${name}','${email}','${hashPass}','${activation_token}')`;
    var result = await con.execute(sql);
    // res.send(`user register successfully!  <a href="${activationLink}"> Activate Account </a>`);
    res.render('activate.ejs',{activationLink});

})


module.exports = { signup ,signup_post }