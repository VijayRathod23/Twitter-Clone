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


const activate= asyncHandler(async (req, res) => {
    const actKey = req.query.token;
    sql = `update users set activated = 1 where activation_token = "${actKey}"`;
    var result = await getdata(sql);
    var json = JSON.stringify(result);
    // console.log("activate result " + json)
    var arr = JSON.parse(json);
    if (arr.affectedRows == 0) {
        res.send("invalid activation link");
    } else {
        res.redirect("/login");
        // res.send("account activated")
    }
})

const login = asyncHandler((req, res) => {
    const token = req.session.user;
    var c = 0;
    var err = '';
    // console.log("in get",c)
    if (token) {
    return res.redirect('/home');
    }
    res.render("login.ejs",{c,err})
    })

const login_post=asyncHandler(async (req, res) => {
    var { email, password,c } = req.body;
    // console.log("is c there?",req.body);
    var varifyUser = `select * from users where email = '${email}'`;
    var result = await getdata(varifyUser);
    if (result == '') {
    c++;
    // console.log(c)
    var err = `incorrect user or password`
    res.render("login.ejs",{c,err})
    // return res.send(user not regitered please register <a href="/signup">register</a>)
    }
    else{
    const data = result;
    // console.log(data[0]);
    //comparing password
    let bpass = data[0].password;
    // console.log("bpass", bpass)
    var match = await bcrypt.compare(password, bpass);
    if (!match) {
    c++;
    // console.log("is c there", c)
    var err = `incorrect user or password`
    res.render("login.ejs", { c ,err})
    // return res.send(wrong user or password!)
    }
    else{
    const activationLink = `/activate?token=${data[0].activation_token}`;
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

const find_user=asyncHandler(async (req, res) => {
    const email = req.query.email;
    var sql = `select email from users where email = '${email}'`;
    var result = await getdata(sql)
    if (result == "") {
        res.json({ exists: false });
    } else {
        res.json({ exists: true });
    }
})

//Account Activation Api
const activate_page2= asyncHandler((req, res) => {
    var token = req.query.token;
    con.query(`UPDATE users SET activated = '1' WHERE activation_token=${token};`, (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result.affectedRows == 0) {
            res.send(`failed to activate`)
        }
        else {
            res.render("login");
        }
    })
})




module.exports = { activate,login,login_post,find_user,activate_page2 }