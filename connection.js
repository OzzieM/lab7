const mysql = require('mysql');
const pool  = mysql.createPool({

    connectionLimit: 10,
    host: "c584md9egjnm02sk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "lcr6tszz68cf1pfj",
    password: "qujn2nyfn05j8tiv",
    database: "ggxqk8ran2onnj4b"

}); 

module.exports = pool;