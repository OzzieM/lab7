const express = require('express');
const router = express.Router();
const conn = require('../connection');

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
    
    conn.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
    
}//getData
    
    


module.exports = router;