const express = require('express');
const router = express.Router();
const conn = require('../connection');

router.get("/", async function(req, res){

    let sql = `SELECT authorId, firstName, lastName FROM q_author`;
    let category = `SELECT DISTINCT category FROM q_quotes`
    let rows = await getData(sql);
    let categories = await getData(category)
    res.render('index', {"authors": rows, "categories" : categories});
});//dbTest
    
async function getData(sql){
    
    return new Promise (function (resolve, reject) {
    
    conn.query(sql, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
    
}//getData
    

module.exports = router;