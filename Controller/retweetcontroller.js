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
//....Retweet
//..............................................called after retweet icon is pressed..................

const retweet = asyncHandler((req, res) => {

    var tweet_id = req.query.tweet_id;  //...................................got tweet_id............
    //const jwtToken = req.session.user;
    const tokenData = req.session.user;
    //const uid = tokenData.id;

    if (tokenData) {
        //const tokenData = jwt.verify(jwtToken, "user");
        const user_id = tokenData.id; // ..............................got user_id from token............

        con.query(`select id from retweets where user_id='${user_id}' and tweet_id='${tweet_id}'`, (err, retweet_status) => {



            //.................................check if already retweeted by this user then delete


            if (retweet_status[0]) {

                var del = getdata(`delete from retweets where user_id='${user_id}' and tweet_id='${tweet_id}'`);
                con.query(`select count(id) as cnt from retweets where  tweet_id='${tweet_id}'`, (err, result) => {
                    if (err) throw err;

                    var count = result[0].cnt;
                    res.json({ count });

                });

            }

            //.....................................else insert into retweets.....................
            else {

                var sql = `insert into retweets (user_id, tweet_id) value ('${user_id}','${tweet_id}')`;

                //.....................................insert into retweets..........................

                con.query(sql, (err, result) => {
                    if (err) throw err;


                    //...................................
                    con.query(`select count(id) as cnt from retweets where tweet_id='${tweet_id}'`, (err, result) => {
                        if (err) throw err;

                        var count = result[0].cnt;
                        res.json({ count });

                    });

                })

            }

        });

    }


    else {
        res.redirect("/login");
    }
})

const retweet_cnt = asyncHandler((req,res)=>{
    
    var tweet_id = req.query.tweet_id;  //...................................got tweet_id............
   
    const tokenData = req.session.user;
    
    if (tokenData) {
       
        const user_id = tokenData.id; // ..............................got user_id from token............

        con.query(`select id from retweets where user_id='${user_id}' and tweet_id='${tweet_id}'`, (err, retweet_status) => {
            if (retweet_status[0]) {
                res.json({status:"True"}) //retweeted
            }
            else{
                res.json({status:"False"}) //Not retweeted
            }

        })
    }
    else {
        res.redirect("/login");
    }



})

const quote_tweet= asyncHandler(async (req, res) => {
    const jwtToken = req.session.user;
    const tokenData = req.session.user;
    const id = tokenData.id; 
    
    const tweet_text = req.body.tweet_text;
    var tweet_id= req.query.tweet_id;

    console.log("uid"+id);
    console.log("tweet text"+tweet_text);
    console.log("tweet_id"+tweet_id);

    if (req.file) {
        const file = req.file;
        const filename = file.originalname;
        const filepath = file.path;
        var imgsrc = 'http://127.0.0.1:3000/uploads/' + req.file.filename;
        const sql = 'INSERT INTO retweets(user_id,tweet_id,retweet_text,retweet_media) VALUES (?,?,?,?)';
        const data = [id, tweet_id,tweet_text, imgsrc];
        con.query(sql, data);
    }
     else {
        const sql = 'INSERT INTO retweets(user_id,tweet_id,retweet_text) VALUES (?,?,?)';
        const data = [id, tweet_id, tweet_text];
        con.query(sql, data);
    }

    res.redirect("/home");
});




module.exports = { retweet , retweet_cnt, quote_tweet}