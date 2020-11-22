const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = require('../connection');

router.get("/", async function(req, res){
    res.render('admin');
});//dbTest

router.get("/addAuthor", async function(req,res){
    var rowAffected = false;
    if(req.query.firstName){
        //form was submitted
        let sql = `INSERT INTO q_author (firstName, lastName, biography, dob, dod, sex, profession, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        let params = [req.query.firstName, req.query.lastName, req.query.biography, req.query.dob, req.query.dod, req.query.sex, req.query.profession, req.query.country];
        let rows = await executeSQL(sql, params)
        // console.log(rows)

        if(rows.affectedRows == 1){
            rowAffected = true;
        }
    }
    
    res.render('addAuthor', {"authorAdded": rowAffected});
});


router.get("/displayAuthors", async function(req,res) {
    let sql = "SELECT authorId, firstName, lastName FROM q_author ORDER BY lastName";

    let rows = await executeSQL(sql);

    res.render("displayAuthors", {"authors":rows})
});

router.get("/updateAuthor", async function(req,res) {
    let sql = "SELECT * FROM q_author WHERE authorId = ?";
    let test = "SELECT DATE_FORMAT(dob, '%Y-%m-%d') as dob, DATE_FORMAT(dod, '%Y-%m-%d') as dod FROM q_author WHERE authorId = ?";
    let rows2 = await executeSQL(test,[req.query.authorId]);
    let rows = await executeSQL(sql,[req.query.authorId]);
    // console.log(rows2)
    res.render("updateAuthor", {"author" : rows, "datetest" : rows2})
});

router.get("/updateAuthor/submit", async function(req,res) {
    // console.log(req.query.authorId)
    let sql = "UPDATE q_author SET firstName = ?, lastName = ?, dob = ?, dod = ?, sex = ?, profession = ?, country = ?, biography = ? WHERE authorId = ?";
    let rows = await executeSQL(sql,[req.query.firstName, req.query.lastName, req.query.dob, req.query.dod, req.query.sex, req.query.profession, req.query.country, req.query.biography,req.query.authorId ]);
    // res.render("updateAuthor", {"author" : rows})
    res.redirect("/admin/displayAuthors")
});

router.get("/deleteAuthor", async function(req,res) {
    let sql = "DELETE FROM q_author WHERE authorId = ?";
    let rows = await executeSQL(sql,[req.query.authorId]);

    res.redirect("/admin/displayAuthors")
});

router.get("/addQuote", async function(req,res){

        // let sql = `INSERT INTO q_author (firstName, lastName, biography) VALUES (?, ?, ?)`;
        let sql = "SELECT authorId, firstName, lastName FROM q_author"
        let sql2 = "SELECT DISTINCT category FROM q_quotes";
        if(req.query.authorId){
            let a = "Insert INTO q_quotes SET quote = ?, authorId = ?, category = ?, likes = ?"
            await executeSQL(a, [req.query.quote, req.query.authorId, req.query.category, req.query.likes])
            res.redirect("/admin/displayQuotes")
        }
        // let params = [req.query.firstName, req.query.lastName, req.query.biography];
        else{
            let rows = await executeSQL(sql)
            let rows2 = await executeSQL(sql2)
            res.render('addQuote', {"authors": rows, "categories": rows2});
        }
  
});

router.get("/displayQuotes", async function(req,res) {
    let sql = "SELECT * FROM q_quotes ORDER BY quoteId ASC";

    let rows = await executeSQL(sql);

    res.render("displayQuotes", {"quotes":rows})
});

router.get("/deleteQuote", async function(req,res) {
    let sql = "DELETE FROM q_quotes WHERE quoteId = ?";
    let rows = await executeSQL(sql,[req.query.quoteId]);

    res.redirect("/admin/displayQuotes")
});

router.get("/updateQuote", async function(req,res) {
    let sql = "SELECT * FROM q_quotes WHERE quoteId = ?";
    let cat = "SELECT DISTINCT category FROM q_quotes"
    let rows = await executeSQL(sql,[req.query.quoteId]);
    let categories = await executeSQL(cat);

    res.render("updateQuote", {"quotes" : rows, "categories": categories})
});
router.get("/updateQuote/submit", async function(req,res) {
    // console.log(req.query.authorId)
    let sql = "UPDATE q_quotes SET quote = ?, category = ?, likes = ? WHERE quoteId = ?";
    let rows = await executeSQL(sql,[req.query.quote, req.query.category, req.query.likes, req.query.quoteId]);
    // res.render("updateAuthor", {"author" : rows})
    res.redirect("/admin/displayQuotes")
});
    
async function executeSQL(sql, params){
    
    return new Promise (function (resolve, reject) {
    
    conn.query(sql, params,  function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
    
}
    


module.exports = router;