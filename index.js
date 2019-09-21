var http = require('http');
var express = require("express");

var app = express();

//set up the template engine
app.set('view engine', 'ejs');

//static files

app.use(express.static('public'));

app.get('/login',function(req,res){

  res.render('index');

});

app.get('/register', function(req, res){
  res.render('register');
});
app.listen(3000);
