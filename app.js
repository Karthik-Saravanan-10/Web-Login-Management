var express = require("express");
var fs=require('fs');
var mysql = require('mysql2');
var port = process.env.PORT || 2000;
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host: "localhost",
    user: "roor",
    password: "root",
    database:"app"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/' + 'register.html')
})

app.post('/dash', (req, res) => {
    var firstName = req.body.inputfirst;
    var lastName = req.body.inputlast;
    var userName = req.body.inputuser;
    var password = req.body.password;

    var sql = `INSERT INTO infor (firstname, lastname, username, password) VALUES ('${firstName}', '${lastName}', '${userName}', '${password}')`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(firstName,"file is updated");
            res.sendFile(__dirname + '/' + 'login.html')
        }
    });
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/' + 'login.html')
})
app.post('/board', (req, res) => {
    var userName = req.body.inputuser;
    var password = req.body.password;

    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }else{
            console.log("checking")
            connection.query(`SELECT * FROM infor WHERE username = '${userName}' AND password = '${password}'`, function (err, result) {
                if (err) {
                    console.log(err);
                    res.write("unavailable user")
                }else{
                    console.log(userName,"Your permission is Granded");
                    res.sendFile(__dirname+'/'+'task.html')
                }
            })
        }
    })
})


app.get('/task', (req, res) => {
    res.sendFile(__dirname + '/' + 'task.html')
})
app.post('/data',(req,res)=>{
    res.end('hii')
});
app.listen(port, (req, res) => {
    console.log(port, "listen")
});