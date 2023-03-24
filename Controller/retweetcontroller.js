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




module.exports = { retweet }