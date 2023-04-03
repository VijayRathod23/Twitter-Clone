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
app.use(express.static("public"))

const { send } = require('process');
app.use(express.static(path.join(__dirname, "/public")));
const multer = require('multer');
var session = require('express-session');

// const nodemailer = require('nodemailer');
const { log } = require('console');
// const { comment } = require('./Controller/commentcontroller');
// const { home } = require('./Controller/homecontroller');
require("dotenv").config();
const user = process.env.user; 



app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(bodyParser.json());
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const register=require('./Routes/register')
app.use('/',register);

const login=require('./Routes/login')
app.use('/',login);

const home=require('./Routes/home')
app.use('/',home);

const profile=require('./Routes/profile')
app.use('/',profile);

const retweet=require('./Routes/retweet')
app.use('/',retweet);

const follow=require('./Routes/follow')
app.use('/',follow);

const forgot=require('./Routes/forgot')
app.use('/',forgot);

//LogOut API
app.get("/logout", (req, res) => {
    req.session.destroy(session);
    res.redirect("/login")
});

app.get("/loader",(req, res) => {
    res.render("loader")
})

app.get('*', function(req, res){
    res.render("404")
  });
app.listen(process.env.PORT, (req, res) => {

    console.log('server is running on port ' + process.env.PORT);
});

