require('dotenv').config()
const mysql = require('mysql');
const express = require('express');

const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    multipleStatements: true
  });

mysqlCon.connect(err => {
    if (err) console.log(err);
    console.log("Connected!");
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nir123';
// flush privileges; - need to do this to give premission on sql workbanch


app.get('/songs', (req, res) => {
    mysqlCon.query('SELECT * FROM songs', (error, results, fields) => {
        if (error) {
            res.send(err.message);
        };
        res.send(results);
      });
});

app.get('/song/:id', async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch(err){
        res.status(400).send(err.message);
    }
});

app.listen(3000)