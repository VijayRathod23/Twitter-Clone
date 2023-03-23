var express = require('express');
const connect = require('http2');
var app = express();
var mysql = require('mysql2');
const { query, response } = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const { type } = require('os');
const { match } = require('assert');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { Console } = require('console');
const path = require('path');
const { send } = require('process');
app.use(express.static(path.join(__dirname, "/public")));
const multer = require('multer');
var session = require('express-session');


app.use(bodyParser.json());
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


//profile storage
const profile_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profiles')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));

    }
})
const upload = multer({ storage: profile_storage });

//upload storage specified
const storageTweet = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload2 = multer({ storage: storageTweet });


app.use(bodyParser.json());
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


//session
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "twitter_clone"

});
con.connect((err) => {
    if (err) throw err;
    console.log("success!")
})

//signup
app.get("/signup", function (req, res) { //signup api
    const availabletkn = req.session.user;
    if (availabletkn) {
        res.redirect("/home");
    }
    res.render('signup')
});


//user registration
app.post('/signup', async (req, res) => {
    const { name, email, pwd } = req.body;
    var sql = `select * from users where email = '${email}'`;
    var result = await getdata(sql);

    console.log("query result" + result);
    if (result.length != 0) {
        return res.send(`User Already registered! please Login <a href="/login">login</a>`)
    }

    var hashPass = await bcrypt.hash(pwd, 10);

    const activation_token = Math.random().toString(36).substring(2, 15);
    const activationLink = `http://localhost:3000/activate?token=${activation_token}`;
    console.log(email);
    var sql = `insert into users(username,email,password,activation_token) values('${name}','${email}','${hashPass}','${activation_token}')`;
    var result = await con.execute(sql);
    res.send(`user register successfully!  <a href="${activationLink}"> Activate Account </a>`);
});

app.get("/activate?", async (req, res) => {
    const actKey = req.query.token;
    sql = `update users set activated = 1 where activation_token = "${actKey}"`;
    var result = await getdata(sql);
    var json = JSON.stringify(result);
    console.log("activate result " + json)
    var arr = JSON.parse(json);
    if (arr.affectedRows == 0) {
        res.send("invalid activation link");
    } else {
        res.redirect("/login");
        // res.send("account activated")
    }
});

app.get("/login", (req, res) => {
    const token = req.session.user;
    var c = 0;
    var err = '';
    console.log("in get",c)
    if (token) {
        return res.redirect('/home');
    }
    res.render("login.ejs",{c,err})
})

app.post("/login", async (req, res) => {
    var { email, password,c } = req.body;
    console.log("is c there?",req.body);
    var varifyUser = `select * from users where email = '${email}'`;
    var result = await getdata(varifyUser);
    if (result == '') {
        c++;
        console.log(c)
        var err = `incorrect user or password`
        res.render("login.ejs",{c,err})
        // return res.send(`user not regitered please register <a href="/signup">register</a>`)
    }
    else{
        const data = result;
        console.log(data[0]);
        //comparing password
        let bpass = data[0].password;
        console.log("bpass", bpass)
        var match = await bcrypt.compare(password, bpass);
        if (!match) {
            c++;
            console.log("is c there", c)
            var err = `incorrect user or password`
            res.render("login.ejs", { c ,err})
            // return res.send(`wrong user or password!`)
        }
        else{
            const activationLink = `http://localhost:3000/activate?token=${data[0].activation_token}`;
            if (data[0].activated == 0) {
                return res.render("activate", { activationLink });
            }
            var login = `select * from users where email = '${email}' and activated =  1`;
            var result = await getdata(login);
            if (login == '') {
                c++;
            }
            else {
                var ins = `insert into login (user_id,login_time,attempts) values ('${result[0].id}',now(),'${c}')`
                var result1 = await getdata(ins);
            }
            //generating jwt token
            // const jwtToken = jwt.sign(data[0], "user");
            // res.cookie("jwtToken", jwtToken);
            // res.redirect("/home");

            req.session.user = result[0];
            res.redirect("/home");
        }
       
    }
    
})
app.get("/finduser", async (req, res) => {
    const email = req.query.email;
    var sql = `select email from users where email = '${email}'`;
    var result = await getdata(sql)
    if (result == "") {
        res.json({ exists: false });
    } else {
        res.json({ exists: true });
    }
});

//sql query function  
async function getdata(sql) {
    return new Promise((res, rej) => {
        con.query(sql, (err, data) => {
            if (err) throw err;
            res(data);
        })
    })
}


//Account Activation Api
app.get('/activepage?', (req, res) => {
    var token = req.query.token;
    con.query(`UPDATE users SET activated = '1' WHERE activation_token=${token};`, (err, result) => {
        if (err) throw err;
        console.log(result)
        if (result.affectedRows == 0) {
            res.send(`failed to activate`)
        }
        else {
            res.render("login");
        }
    })
})


//Home Page
app.get("/home", async (req, res) => {
    console.log("session");
    console.log("user",req.session.user);
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/signup">register</a>`);
    }
    const sql = `SELECT * FROM tweets ORDER BY created_at DESC`;
    const tweet = await getdata(sql);
    const tokenData = req.session.user;
    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);

     // harshupdate
     const sql1= `select * from users limit 5;`;
     const user_data= await getdata(sql1);
     console.log("all user data",user_data)

    const sql2= `select liked,pid,uid from likes where uid='${tokenData.id}'`
    const likes= await getdata(sql2);
    // var like_flag = likes[0].liked;
    var flag = [];
    console.log(likes);

    // .......................................retweet............................................

    var retweet = await getdata(`select tweets.user_id as id, tweets.tweet_text as tweet_text , tweets.media as media, tweets.likes as likes , tweets.username as username ,tweets.profile_pic as profile_pic , retweets.user_id as retweet_user_id from tweets join retweets on tweets.id = retweets.tweet_id`)
    var tweets = new Array();
    var new_user_profile_pic = new Array();
    var new_user_name = new Array();
    console.log("new user p pic none" + new_user_profile_pic);
    console.log("new user name none"+ new_user_name);
    
    //if any retweet found
    if (retweet[0]) {
        for (var i = 0; i < retweet.length; i++) {
            tweets.push(retweet[i]);
        
        var new_user_data = await getdata(`select username , profile_pic from users where id= ${retweet[i].retweet_user_id}`);
        new_user_profile_pic.push( new_user_data[0].profile_pic);
        new_user_name.push(new_user_data[0].username);

        //console.log("tweet" + retweet[i].media);
        }

    }
  

for(var i =0; i< tweet.length; i++){

    tweets.push(tweet[i]);
}


// ..................retweet complete.......................


    const result = await getdata(`SELECT follow.f_id FROM twitter_clone.follow where flag = '1'`);
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
        const basic = `SELECT * FROM twitter_clone.users where id not in${ids}`;
        // console.log(basic);
        const user_data = await getdata(basic);
        // console.log(query);
        res.render("home", { tokenData, selectData, tweets,user_data,likes,flag,new_user_profile_pic, new_user_name, user_data })
    }
    else {

        const sql1 = `select * from users limit 5;`;
        const user_data = await getdata(sql1);
        //  console.log("all user data",user_data)
        res.render("home", { tokenData, selectData, tweets,user_data,likes,flag, new_user_profile_pic, new_user_name,user_data })
    }
})


// harshupdate
// const sql1 = `select * from users limit 5;`;
// const user_data = await getdata(sql1);
// console.log("all user data", user_data);



//...................retweet count .......................
// var count = new Array();
// for (var i = 0; i < tweets.length; i++) {

//     const sql_retweet = `select count(id) as cnt from retweets where tweet_id = '${tweets[i].id}'`;
//     const retweet_cnt = await getdata(sql_retweet);
//     count.push(retweet_cnt[0].cnt);

// }


// res.render("home", { tokenData, selectData, tweets, user_data,count })



// Profile Page
// Profile Page
app.get("/profile", async (req, res) => {
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/">register</a>`);
    }
    const tokenData = req.session.user;
    // **************21march*************
    const sql = `SELECT * FROM tweets where user_id = '${tokenData.id}' ORDER BY created_at DESC`;
    const tweets = await getdata(sql);

    console.log("bcnjffjewjfjnvjnejbnvjkebjkvbjbjhbjhbhb*******************", tweets)

    // *************************
    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);
    //res.render("profile", { tokenData, selectData,tweets})



    //--follower count

    const result = `SELECT COUNT(user_id) AS follower FROM twitter_clone.follow where  (f_id = '${tokenData.id}' and rm_follower ='1');`
    const followerdata = await getdata(result)


    //--follow count
    var result1 = (`SELECT COUNT(f_id) AS follow FROM twitter_clone.follow where  (user_id = '${tokenData.id}' and flag ='1');`)
    const followdata = await getdata(result1)

    console.log("followerrrrrrrrr", followdata[0].follow)

    // res.render("profile", { tokenData, selectData, followerdata, followdata })



    //..........select retweeted
    const select_retweet = `select * from retweets where user_id = '${tokenData.id}'`;
    const retweet_data = await getdata(select_retweet);

    //..............if any retweet found for particular user


    var count = new Array();
    var tweet_data = new Array();

    if (retweet_data[0]) {

        for (var i = 0; i < retweet_data.length; i++) {

            var retweeted_tweet_id = retweet_data[i].tweet_id;
            console.log(retweeted_tweet_id);

            var tweet_select = `select * from twitter_clone.tweets where id = '${retweeted_tweet_id}'`;

            var tweet_data_1 = await getdata(tweet_select);


            tweet_data.push(tweet_data_1[0]);



            var sql_retweet = `select count(id) as cnt from retweets where tweet_id = '${retweeted_tweet_id}'`;
            var retweet_cnt = await getdata(sql_retweet);
            count.push(retweet_cnt[0].cnt);


        }



        res.render("profile", { tokenData, selectData, tweets, tweet_data, count, followerdata, followdata })
    }
    else {
        res.render("profile", { tokenData, selectData, tweets, tweet_data: 0, followerdata, followdata })

    }



})



//------kinjal----------

app.get("/newfollow", async (req, res) => {

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

//-------------------------follow-------------------------------------------------//

app.get('/follow', async (req, res) => {

    var id = req.query.id;

    var result = (`SELECT * FROM twitter_clone.follow where (user_id = '${id}'and flag = '1');`)
    const resultdata = await getdata(result)

    console.log('follow listig', resultdata)


    // console.log(resultdata)

    res.json(resultdata)

})

app.get('/postfollow', async (req, res) => {

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

//---------------------follower---------------------------------------------------------//

app.get('/postfollower', async (req, res) => {

    //var result = await query(`SELECT f_id FROM twitter.follow where user_id=1;`)
    var id = req.query.id;
    // var profile_pic = req.query.profile_pic;

    //   console.log('insertid',id,profile_pic)

    const result = `SELECT * FROM twitter_clone.follow where (f_id = '${id}' and rm_follower ='1');`
    const resultdata = await getdata(result)

    console.log(resultdata)

    res.json(resultdata)

})
//-------------------unfollow--------------------

app.get('/post-Unfollow', async (req, res) => {

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

//---------------remove follower-----------

app.get('/post-rm-follower', async (req, res) => {

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




// Edit Profile
app.get("/edit_profile", async (req, res) => {
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/signup">register</a>`);
    }
    const tokenData = req.session.user;

    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);
    res.render("edit_profile", { tokenData, selectData })
})


app.post("/edit_profile", upload.single('profile'), async (req, res) => {
    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/signup">register</a>`);
    }
    const tokenData = req.session.user;
    var updateTime = new Date();
    const { username, dob, bio, location } = req.body;
    if (req.file) {
        var profileurl = 'http://127.0.0.1:3000/profiles/' + req.file.filename;
        var sql = `update users set username='${username}',profile_pic='${profileurl}',dob='${dob}',bio='${bio}',location='${location}',updated_at='${updateTime}'  where id='${tokenData.id}'`
        var result = await getdata(sql);

        var sql1 = `update tweets set username='${username}',profile_pic='${profileurl}' where user_id='${tokenData.id}'`
        var result1 = await getdata(sql1);


        var sql2 = `update comment set username='${username}',profile_pic='${profileurl}' where uid='${tokenData.id}'`
        var result2 = await getdata(sql2);

        console.log(result)
    } else {
        var sql = `update users set username='${username}',dob='${dob}',bio='${bio}',location='${location}' where id='${tokenData.id}'`
        var result = await getdata(sql);







        
        var sql1 = `update tweets set username='${username}' where user_id='${tokenData.id}'`
        var result1 = await getdata(sql1);

        var sql2 = `update comment set username='${username}' where uid='${tokenData.id}'`
        var result2 = await getdata(sql2);
    }
    const select = `select * from users where id = '${tokenData.id}'`;
    const selectData = await getdata(select);

    res.render("edit_profile", { selectData })
})

//LogOut API
app.get("/logout", (req, res) => {
    req.session.destroy(session);
    res.redirect("/login")
});

//api for creating tweets
app.post("/tweet", upload2.single('media'), async (req, res) => {
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
});



//search
app.get('/search',async(req,res)=>{
    var search=req.query.search;
    const sql2= `select * from users where username LIKE '${search}%'`;
    const search_data= await getdata(sql2);
    console.log("userdata",search_data);
    res.json(search_data)
    
})
//displaying searched profile
app.get("/search_profile?",async(req,res)=>{

    const jwtToken = req.session.user;
    if (!jwtToken) {
        return res.send(`you are not authorized register first <a href="/login">register</a>`);
    }
    const tokenData = req.session.user;
    var sid = req.query.sid;
    console.log("sid front",sid)
    const select = `select * from users where id = ${sid}`;
    const selectData = await getdata(select);
    console.log(selectData)    
    res.render('search_profile', { tokenData, selectData })

})

app.post('/like', async (req, res) => {
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

});
//Forget Password
app.get('/forget-pass', (req, res) => {
    res.render('forget-pass');
})
app.get('/get-otp?', async (req, res) => {
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
            from: 'vijay.rathod.esparkbiz.23@gmail.com',
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
app.get('/otpscreen', (req, res) => {
    res.render('otpscreen')
});
app.get('/verify_otp?', async (req, res) => {
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
        return res.redirect('/change-pass');
    } else {
        res.send("Invalid Otp")
    }

});
app.get('/change-pass', (req, res) => {
    res.render('change-pass')
});
//forgot passs done

app.post('/save-pass', async (req, res) => {
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


//comment display

app.post('/comment_display', async (req, res) => {

    const tokenData = req.session.user;

    const { uid, pid, commentfield, profile, username } = req.body;
    const sql = `select profile_pic,comments,username from comment where pid='${pid}'`;
    var query = await getdata(sql);
    res.json(query)
    console.log(query);


});


//comments api
//comments
app.post('/comment', async (req, res) => {

    const tokenData = req.session.user;


    const { uid, pid, username, profile, commentfield } = req.body;
    console.log('comment', req.body);

    const sql = `INSERT INTO comment (uid, pid,profile_pic,comments,username,inserted_at)VALUES ('${uid}', '${pid}', '${profile}','${commentfield}',  '${username}', NOW())`;
    var query = await getdata(sql);

    res.json(query)

});




//....Retweet
//..............................................called after retweet icon is pressed..................
app.get("/retweet", (req, res) => {

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




app.listen(3000, () => {
    console.log("app listening on 3000 port");
    });
