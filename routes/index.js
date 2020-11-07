const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get("/", async function(req, res){

    let sql = `SELECT authorId, firstName, lastName FROM q_author`;
    let category = `SELECT DISTINCT category FROM q_quotes`
    let rows = await getData(sql);
    let categories = await getData(category)
    res.render('index', {"authors": rows, "categories" : categories});
});//dbTest
    
async function getData(sql){
    
    return new Promise (function (resolve, reject) {
    let conn = dbConnection();
    
    conn.query(sql, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
    
}//getData
    
    
    //values in red must be updated
function dbConnection(){

    const pool  = mysql.createPool({

        connectionLimit: 10,
        host: "c584md9egjnm02sk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "lcr6tszz68cf1pfj",
        password: "qujn2nyfn05j8tiv",
        database: "ggxqk8ran2onnj4b"

    }); 

    return pool; 
}


module.exports = router;