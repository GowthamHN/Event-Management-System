var http = require('http');
var express = require("express");
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();


//Body parser to parse the data sent by the registration/login form
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Setting up a connection with mysql and creating a database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS ems", function(err){
    if (err) throw err;
  });
  console.log("Database EMS was created");
  con.query("use ems", function(err){
    if (err) throw err;
//  con.end();
  });
});

//set up the template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

//server routines
app.get('/login',function(req,res){
  res.render('index');
});

app.get('/register', function(req, res){
  res.render('register');
});

//getting registration details
app.post('/register',urlencodedParser, function(req, res){
    sql = "CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT PRIMARY KEY,username varchar(30), password varchar(30), email varchar(30))";
    con.query(sql, function(err){
      if (err) throw err;
    });
    sql = "INSERT INTO users (username, password, email) VALUES ( \'"     +      req.body.username    +   "\',\'"    +    req.body.pass + "\',\'" +   req.body.email   +"\')";
    con.query(sql, function(err){
      if (err) throw err;
    });
    res.render('index');
});

//Checking if the user EXISTS

app.post('/login', urlencodedParser, function(req, res){
    sql = "select * from users where email = \'" + req.body.email  + "\' and password = \'" + req.body.pass + "\'" ;
    console.log(sql);
    result = con.query(sql, function(err){
      if (err) throw err;
    });
    //console.log(res);
    if(result)
      res.render('dashboard');
});


app.listen(3000);
