var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

});

con.connect((err) => {
    if (err) throw err;
    console.log("success!")
})


module.exports=con