const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get("/", async function(req, res){
    let word = req.query.keyword;
    let sql = `SELECT authorId, firstName, lastName, quote FROM q_quotes NATURAL JOIN q_author WHERE quote LIKE ? `;
    let params = [`%${word}%`];

    if(req.query.authorId){
        sql += " AND authorId = ?";
        params.push(req.query.authorId)
    }
    if(req.query.categories){
        sql += " AND category = ?";
        params.push(req.query.categories)
    }

    let rows = await getData(sql, params);
    res.render('results', {"rows": rows});
});//dbTest
    
async function getData(sql, params){
    
    return new Promise (function (resolve, reject) {
    let conn = dbConnection();
    
    conn.query(sql, params, function (err, rows, fields) {
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