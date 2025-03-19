//to install the node js type 'npm init -y' in terminal
//to install the nodemon type 'npm install express' in terminal
//to run the nodemon change the script to 'nodemon fileName.js', and type 'npm run scriptName' in terminal

//Stimulate this computer to be server
const express = require('express');
const path = require('path');
const con = require('./db.js')
const app = express();
const bcrypt = require('bcrypt');



//enable the server can reach the public folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//to tell the server to use JSON
app.use(express.json());

app.post('/login', function(req, res) {
    const username = req.body.username;
    const raw = req.body.password;
    const sql = `SELECT id, username, password, role FROM user WHERE username=?`;
    con.query(sql, [username], function(err, result) {
        if(err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        bcrypt.compare(raw, result[0].password, function(err2, same) {
            if(err2) {
                console.error(err2);
                return res.status(500).send('Internal Server Error');
            }
            if(same === false) {
                return res.status(401).send('Wrong username or password');
            }
            res.status(200).send('Login OK');
        });
    });
});


//hash the password
app.get('/password/:raw', function(req, res){
    const raw = req.params.raw;
    bcrypt.hash(raw, 10, function(err, hash){
        if(err){
            return res.status(500).send('Interal Server Error');
        }
        res.status(200).send(hash);
    });
});


//get current datetime
app.get('/now', function (req, res) {
    const now = new Date().toLocaleString();//to get current datetime
    res.status(200).send(now);//optional res.send(now); its status gonna be 200 automatically
});

//localhost:3000
//root service (req = request, res = response)
//root service must be at the last
app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, 'views/index.html'));//current root repositories for index.html
    res.sendFile(path.join(__dirname, 'views/login.html'));//current root repositories for login.html
});

app.listen(3000, function () {
    console.log('Server is running at port 3000');
}); //Run the code at port 3000.