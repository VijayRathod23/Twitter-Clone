var bcrypt = require('bcryptjs');
const con = require('../Connection/connection')
const asyncHandler = require("express-async-handler");


async function getdata(sql) {
    return new Promise((res, rej) => {
        con.query(sql, (err, data) => {
            if (err) throw err;
            res(data);
        })
    })
}


const comment_display= asyncHandler(async (req, res) => {

    const tokenData = req.session.user;

    const { uid, pid, commentfield, profile, username } = req.body;
    const sql = `select profile_pic,comments,username from comment where pid='${pid}'`;
    var query = await getdata(sql);
    res.json(query)
    console.log(query);


}) 


//comments api
//comments


const comment= asyncHandler(async (req, res) => {

    const tokenData = req.session.user;


    const { uid, pid, username, profile, commentfield } = req.body;
    console.log('comment', req.body);

    const sql = `INSERT INTO comment (uid, pid,profile_pic,comments,username,inserted_at)VALUES ('${uid}', '${pid}', '${profile}','${commentfield}',  '${username}', NOW())`;
    var query = await getdata(sql);

    res.json(query)

}) 




module.exports = {comment_display,comment}