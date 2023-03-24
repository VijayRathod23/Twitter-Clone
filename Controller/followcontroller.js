
var express = require('express');
const { query, response } = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const con = require('../Connection/connection')
const asyncHandler = require("express-async-handler");
const multer = require('multer');
const path = require('path');





async function getdata(sql) {
    return new Promise((res, rej) => {
        con.query(sql, (err, data) => {
            if (err) throw err;
            res(data);
        })
    })
}



const newfollow = asyncHandler(async (req, res) => {

    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/">register</a>`);
    }
    const tokenData = req.session.user;
    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);

    //--follower count

    const result = `SELECT COUNT(user_id) AS follower FROM twitter_clone.follow where  (f_id = '${tokenData.id}' and rm_follower ='1');`
    const followerdata = await getdata(result)


    //--follow count
    var result1 = (`SELECT COUNT(f_id) AS follow FROM twitter_clone.follow where  (user_id = '${tokenData.id}' and flag ='1');`)
    const followdata = await getdata(result1)

    console.log("followerrrrrrrrr", followdata[0].follow)
    res.render("follow", { tokenData, selectData, followerdata, followdata })

})


const follow = asyncHandler(async (req, res) => {

    var id = req.query.id;

    var result = (`SELECT * FROM twitter_clone.follow where (user_id = '${id}'and flag = '1');`)
    const resultdata = await getdata(result)

    console.log('follow listig', resultdata)


    // console.log(resultdata)

    res.json(resultdata)

})


const postfollow = asyncHandler(async (req, res) => {

    //to get user id to store it in follow table
    //  const jwtToken = req.cookies.jwtToken;
    const tokenData = req.session.user;
    // const tokenData = jwt.verify(jwtToken, "user");
    var user_id = tokenData.id;
    var username = tokenData.username;
    var u_profile_pic = tokenData.profile_pic;
    var u_email = tokenData.email;


    var id = req.query.id;
    var f_username = req.query.username;
    var f_email = req.query.f_email;
    var f_profile_pic = req.query.profile_pic;

    // console.log(f_email)

    //var 
    var result = (`INSERT INTO twitter_clone.follow (f_id, user_id ,username, flag ,u_profile_pic,u_email,f_username,f_email,f_profile_pic,rm_follower ) 
      VALUES ('${id}', '${user_id}','${username}','1','${u_profile_pic}','${u_email}','${f_username}','${f_email}','${f_profile_pic}','1'); `)

    const resultdata = await getdata(result)
    console.log("here------", result)

    res.json(resultdata)

})


const postfollower = asyncHandler(async (req, res) => {

    //var result = await query(`SELECT f_id FROM twitter.follow where user_id=1;`)
    var id = req.query.id;
    // var profile_pic = req.query.profile_pic;

    //   console.log('insertid',id,profile_pic)

    const result = `SELECT * FROM twitter_clone.follow where (f_id = '${id}' and rm_follower ='1');`
    const resultdata = await getdata(result)

    console.log(resultdata)

    res.json(resultdata)

})

const post_Unfollow = asyncHandler(async (req, res) => {

    //to get user id to store it in follow table
    //  const jwtToken = req.cookies.jwtToken;
    const tokenData = req.session.user;
    // const tokenData = jwt.verify(jwtToken, "user");
    var user_id = tokenData.id;
    var username = tokenData.username;
    var u_profile_pic = tokenData.profile_pic;
    var u_email = tokenData.email;


    var id = req.query.id;
    var f_username = req.query.username;
    var f_email = req.query.f_email;
    var f_profile_pic = req.query.profile_pic;

    // console.log(f_email)

    //var 
    var result = (`  UPDATE twitter_clone.follow
    SET flag = '0'
    WHERE  (f_id= '${id}' and user_id ='${user_id}');`)
    const resultdata = await getdata(result)
    //    console.log("here------",result)

    res.json(resultdata)

})
const post_rm_follower = asyncHandler(async (req, res) => {

    //to get user id to store it in follow table
    //  const jwtToken = req.cookies.jwtToken;
    const tokenData = req.session.user;
    // const tokenData = jwt.verify(jwtToken, "user");
    var user_id = tokenData.id;
    var username = tokenData.username;
    var u_profile_pic = tokenData.profile_pic;
    var u_email = tokenData.email;


    var id = req.query.id;
    var f_username = req.query.username;
    var f_email = req.query.f_email;
    var f_profile_pic = req.query.profile_pic;



    var result = (`  UPDATE twitter_clone.follow
   SET rm_follower = '0'
   WHERE  ((f_id= '${id}' and user_id ='${user_id}' ) or (f_id ='${user_id}' and user_id ='${id}' ));`)
    const resultdata = await getdata(result)
    //    console.log("here------",result)

    //    console.log(result)

    //var 
    res.json(resultdata)

})




module.exports = { post_rm_follower, post_Unfollow, postfollower, postfollow, follow, newfollow }