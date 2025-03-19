//to install the node js type 'npm init -y' in terminal
//to install the nodemon type 'npm install express' in terminal
//to run the nodemon change the script to 'nodemon fileName.js', and type 'npm run scriptName' in terminal

//Stimulate this computer to be server
const express = require('express');
const path = require('path');
const con = require('./db.js')
const app = express();

//enable the server can reach the public folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//to tell the server to use JSON
app.use(express.json());

app.post('/login', function (req, res) {
    const { username, password } = req.body;
    const sql = `SELECT id, username, role FROM user WHERE username = ? AND password = ?`;
    con.query(sql, [username, password], function(err, result){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if(result.length != 1){
            return res.status(401).send('Wrong username or password');
        }
        res.status(200).send('Login OK');
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
    // res.send('Hello world');
    // res.sendFile(path.join(__dirname, 'views/index.html'));//current root repositories for index.html
    res.sendFile(path.join(__dirname, 'views/login.html'));//current root repositories for login.html
});

app.listen(3000, function () {
    console.log('Server is running at port 3000');
}); //Run the code at port 3000.