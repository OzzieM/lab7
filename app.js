const express = require("express")
const mysql = require("mysql")

const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const infoRouter = require('./routes/info');

const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/info', infoRouter);


app.listen(3000, () =>{
    console.log("server started")
});