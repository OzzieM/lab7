const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get("/:authorId", async function(req, res){
    let authorId = req.params.authorId;
    // console.log(authorId)
    let sql = `SELECT * FROM q_author WHERE authorId = ?`;
    params = [`${authorId}`]
    let rows = await getData(sql, params);
    res.send(rows);
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