var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "twitter_clone"

});
console.log(con);

con.connect((err) => {
    if (err) throw err;
    console.log("success!")
})


module.exports=con