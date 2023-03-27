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





const home = asyncHandler(async (req, res) => {
    console.log("session");
    console.log("user", req.session.user);
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`Session Expired! please login again <a href="/login">Login</a>`);
    }
    const sql = `SELECT * FROM tweets ORDER BY created_at DESC`;
    const tweet = await getdata(sql);
    const tokenData = req.session.user;
    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);

    // harshupdate
    const sql1 = `select * from users limit 5;`;
    const user_data = await getdata(sql1);
    console.log("all user data", user_data)

    const sql2 = `select liked,pid,uid from likes where uid='${tokenData.id}'`
    const likes = await getdata(sql2);
    // var like_flag = likes[0].liked;
    var flag = [];
    console.log(likes);

    // .......................................retweet............................................
    var flag_rewteet = new Array();
    var count = new Array();

    var retweet = await getdata(`select tweets.user_id as id, tweets.tweet_text as tweet_text , tweets.media as media, tweets.likes as likes , tweets.username as username ,tweets.profile_pic as profile_pic , retweets.user_id as retweet_user_id , retweets.retweet_text as retweet_text , retweets.retweet_media as retweet_media from tweets join retweets on tweets.id = retweets.tweet_id`)
    var tweets = new Array();
    var new_user_profile_pic = new Array();
    var new_user_name = new Array();
    console.log("new user p pic none" + new_user_profile_pic);
    console.log("new user name none" + new_user_name);

    //if any retweet found
    if (retweet[0]) {
        for (var i = 0; i < retweet.length; i++) {
            count.push(0);
            flag_rewteet.push(0);
            tweets.push(retweet[i]);

            var new_user_data = await getdata(`select username , profile_pic from users where id= ${retweet[i].retweet_user_id}  `);
            new_user_profile_pic.push(new_user_data[0].profile_pic);
            new_user_name.push(new_user_data[0].username);
            console.log("tweetid" + retweet[i].tweet_id);
            console.log("tweet media" + retweet[i].retweet_media);
            console.log("tweet text" + retweet[i].retweet_text);
            console.log("user id"+retweet[i].retweet_user_id);
        }

    }


    for (var i = 0; i < tweet.length; i++) {
        var cnt_sql = `select count(id) as cnt from retweets where tweet_id='${tweet[i].id}'`;
        var result1 = await getdata(cnt_sql);
        var total = result1[0].cnt;
        count.push(total);
        var flag_retwt_sql = `select id from retweets where user_id='${tokenData.id}' and tweet_id='${tweet[i].id}'`;
        var flag_retwt = await getdata(flag_retwt_sql);
        if (flag_retwt[0]) {
            flag_rewteet.push(1);
        }
        else {
            flag_rewteet.push(0);
        }

        tweets.push(tweet[i]);
    }


    // ..................retweet complete.......................


    const result = await getdata(`SELECT follow.f_id FROM follow where flag = '1'`);
    // const user=result[0];
    // console.log(user)
    var ids = "(";
    if (result.length != 0) {


        for (let i = 0; i < result.length; i++) {
            ids += `${result[i].f_id}`;

            if (i != result.length - 1) {
                ids += ","
            }
        }

        const userid = `${tokenData.id}`;

        ids += `,${userid})`
        const basic = `SELECT * FROM users where id not in${ids} limit 7`;
        // console.log(basic);
        const user_data = await getdata(basic);
        // console.log(query);
        res.render("home", { tokenData, selectData, tweets, user_data, likes, flag, new_user_profile_pic, new_user_name, user_data, count, flag_rewteet })
    }
    else {

        const sql1 = `select * from users limit 5;`;
        const user_data = await getdata(sql1);
        //  console.log("all user data",user_data)
        res.render("home", { tokenData, selectData, tweets, user_data, likes, flag, new_user_profile_pic, new_user_name, user_data, count, flag_rewteet })
    }
})




const tweet = asyncHandler(async (req, res) => {
    const jwtToken = req.session.user;
    const tokenData = req.session.user;
    const id = tokenData.id;
    const username = tokenData.username;
    const profile_pic = tokenData.profile_pic;
    console.log("profile pic");
    const tweet_text = req.body.tweet_text;

    if (req.file) {
        const file = req.file;
        const filename = file.originalname;
        const filepath = file.path;
        var imgsrc = 'http://127.0.0.1:3000/uploads/' + req.file.filename;
        const sql = 'INSERT INTO tweets(user_id,tweet_text,media,username,profile_pic) VALUES (?,?,?,?,?)';
        const data = [id, tweet_text, imgsrc, username, profile_pic];
        con.query(sql, data);
    } else {
        const sql = 'INSERT INTO tweets(user_id,tweet_text,username,profile_pic) VALUES (?,?,?,?)';
        const data = [id, tweet_text, username, profile_pic];
        con.query(sql, data);
    }

    res.redirect("/home");
})


//search
const search = asyncHandler(async (req, res) => {
    var search = req.query.search;
    const sql2 = `select * from users where username LIKE '${search}%'`;
    const search_data = await getdata(sql2);
    console.log("userdata", search_data);
    res.json(search_data)

})

//displaying searched profile
const search_profile = asyncHandler(async (req, res) => {

    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`Session Expired! please login again <a href="/login">Login</a>`);
    }
    const tokenData = req.session.user;
    var sid = req.query.sid;
    console.log("sid front", sid)
    const select = `select * from users where id = ${sid}`;
    const selectData = await getdata(select);
    console.log(selectData)
    res.render('search_profile', { tokenData, selectData })

})


const like = asyncHandler(async (req, res) => {
    var pid = req.body.pid;
    var user_id = req.body.uid;
    const jwtToken = req.session.user;
    const tokenData = req.session.user;
    const uid = tokenData.id;
    console.log(pid)
    console.log(uid)

    console.log("logged in user", uid);
    //selecting either user has already likes or not
    var select = `select * from likes where uid='${uid}' and pid='${pid}'`;
    var data = await getdata(select);
    // console.log(data)

    //if empty then user does not has liked before so insert user values in database
    if (data == '') {
        console.log("not found")
        var insert = `insert into likes (pid,uid,liked) values('${pid}','${uid}','1');`
        var i = await getdata(insert);
        var sql = `update tweets set likes = likes + 1  where id = '${pid}' and user_id='${user_id}'`;
        var result = await getdata(sql);
        console.log("inserted")
        var q = `select likes from tweets where user_id='${user_id}' and id='${pid}'union select liked from likes where pid='${pid}' and uid='${uid}';`;
        var query = await getdata(q);
        console.log(query)
        console.log(query[0].likes);
        res.json(query)
    }
    //update likes status in db
    else {
        console.log("found")
        var f = `select * from likes where pid='${pid}' and uid='${uid}'`;
        var u = await getdata(f);
        // console.log("result data", u[0].liked)
        console.log("result data", u[0].liked)
        if (u[0].liked == 0) {
            console.log("like")
            var sql = `update tweets set likes = likes + 1 where id = '${pid}' and user_id='${user_id}'`;
            var result = await getdata(sql);
            var minus = `update likes set liked = 1 where pid='${pid}' and uid='${uid}'`;
            var done = await getdata(minus);
            console.log("liked")
            var q = `select likes from tweets where user_id='${user_id}' and id='${pid}'union select liked from likes where pid='${pid}' and uid='${uid}';`;
            var query = await getdata(q);
            console.log(query)
            console.log(query[0].likes);
            res.json(query)
            //   res.redirect("/home");
        }
        if (u[0].liked == 1) {
            console.log("dislike")
            var sql = `update tweets set likes = likes - 1  where id = '${pid}' and user_id='${user_id}'`;
            var result = await getdata(sql);
            var minus = `update likes set liked = 0 where pid='${pid}' and uid='${uid}'`;
            var done = await getdata(minus);
            var q = `select likes from tweets where user_id='${user_id}' and id='${pid}'union select liked from likes where pid='${pid}' and uid='${uid}';`;
            var query = await getdata(q);
            console.log(query);
            res.json(query);
        }
    }

})






module.exports = { home, tweet, like, search_profile, search }