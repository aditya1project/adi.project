var express = require('express');
var bodyParser =require('body-parser');


  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/test'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

app.post('/register', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
   
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
       
    } 
db.collection('local').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('welcome.html'); 
}) 

app.get ('/',function(req,res)
{
    res.sendfile('index.html');
})
app.get ('/register',function(req,res)
{
    res.sendfile('register.html');
})

app.get('/active',function(res)
{
    res.sendfile('active.html');
})

app.get('/welcome',function(req,res)
{
    res.sendfile('welcome.html');
})
app.get('/index',function(req,res)
{
    res.sendfile('index.html');
})

app.listen(3003,() =>
{
    console.log("server is working");
})
