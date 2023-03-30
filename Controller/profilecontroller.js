var express = require('express');
const { query, response } = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const con = require('../Connection/connection')
const asyncHandler = require("express-async-handler");
const multer = require('multer');
const path = require('path');
const { log } = require('console');





async function getdata(sql) {
    return new Promise((res, rej) => {
        con.query(sql, (err, data) => {
            if (err) throw err;
            res(data);
        })
    })
}

// Profile Page
const profile = asyncHandler(async (req, res) => {
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`Session Expired! please login again <a href="/login">Login</a>`);
    }
    const tokenData = req.session.user;
    // **************21march*************
    const sql = `SELECT * FROM tweets where user_id = '${tokenData.id}' ORDER BY created_at DESC`;
    const tweets = await getdata(sql);

    // *************************
    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);
    var created_date = String(selectData[0].created_at);
    var cr_date=created_date.slice(3,16);
    // console.log(".........................",cr_date);

    const sql2 = `select liked,pid,uid from likes where uid='${tokenData.id}'`
    const likes = await getdata(sql2);
    // var like_flag = likes[0].liked;
    var flag = [];
    // console.log(likes);
    //res.render("profile", { tokenData, selectData,tweets})



    //--follower count

    const result = `SELECT COUNT(user_id) AS follower FROM follow where  (f_id = '${tokenData.id}' and rm_follower ='1');`
    const followerdata = await getdata(result)


    //--follow count
    var result1 = (`SELECT COUNT(f_id) AS follow FROM follow where  (user_id = '${tokenData.id}' and flag ='1');`)
    const followdata = await getdata(result1)

    // console.log("followerrrrrrrrr", followdata[0].follow)

    // res.render("profile", { tokenData, selectData, followerdata, followdata })



    //..........select retweeted
    const select_retweet = `select * from retweets where user_id = '${tokenData.id}' order by created_at desc`;
    const retweet_data = await getdata(select_retweet);

    //..............if any retweet found for particular user


    var count = new Array();
    var tweet_data = new Array();
    console.log("..................//////////////////////............",retweet_data[0])
    if (retweet_data[0]) {

        for (var i = 0; i < retweet_data.length; i++) {

            var retweeted_tweet_id = retweet_data[i].tweet_id;
            // console.log(retweeted_tweet_id);

            var tweet_select = `select * from tweets where id = '${retweeted_tweet_id}'`;

            var tweet_data_1 = await getdata(tweet_select);
console.log("..................",tweet_data_1[0])

            tweet_data.push(tweet_data_1[0]);



            var sql_retweet = `select count(id) as cnt from retweets where tweet_id = '${retweeted_tweet_id}'`;
            var retweet_cnt = await getdata(sql_retweet);
            count.push(retweet_cnt[0].cnt);


        }



        res.render("profile", { tokenData, selectData, tweets, tweet_data,retweet_data, count, followerdata, followdata,likes,flag ,cr_date})
    }
    else {
        
        res.render("profile", { tokenData, selectData, tweets, tweet_data: 0,count,  followerdata, followdata,likes,flag ,cr_date})

    }



})

// Edit Profile get

const edit_profile= asyncHandler(async (req, res) => {
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`Session Expired! please login again <a href="/login">Login</a>`);
    }
    const tokenData = req.session.user;

    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);
    res.render("edit_profile", { tokenData, selectData })
})



// Edit Profile post

const edit_profile_post= asyncHandler(async (req, res) => {
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`Session Expired! please login again <a href="/login">Login</a>`);
    }
    const tokenData = req.session.user;
    var updateTime = new Date();
    const { username, dob, bio, location } = req.body;
    if (req.file) {
        var profileurl = '/profiles/' + req.file.filename;
        var sql = `update users set username='${username}',profile_pic='${profileurl}',dob='${dob}',bio='${bio}',location='${location}',updated_at='${updateTime}'  where id='${tokenData.id}'`
        var result = await getdata(sql);

        var sql1 = `update tweets set username='${username}',profile_pic='${profileurl}' where user_id='${tokenData.id}'`
        var result1 = await getdata(sql1);


        var sql2 = `update comment set username='${username}',profile_pic='${profileurl}' where uid='${tokenData.id}'`
        var result2 = await getdata(sql2);

        var sql3 = `update follow set username='${username}',u_profile_pic='${profileurl}' where user_id='${tokenData.id}'`
        var result3 = await getdata(sql3);

        // console.log(result)
    } else {
        var sql = `update users set username='${username}',dob='${dob}',bio='${bio}',location='${location}' where id='${tokenData.id}'`
        var result = await getdata(sql);
        
        var sql1 = `update tweets set username='${username}' where user_id='${tokenData.id}'`
        var result1 = await getdata(sql1);

        var sql2 = `update comment set username='${username}' where uid='${tokenData.id}'`
        var result2 = await getdata(sql2);

        var sql3 = `update follow set username='${username}' where user_id='${tokenData.id}'`
        var result3 = await getdata(sql3);
    }
    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);

    res.render("edit_profile", { selectData })
})










module.exports = { edit_profile,profile,edit_profile_post}