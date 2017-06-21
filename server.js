var cors = require("cors");
var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
var parseHeader = require("parse-http-header");
var qs = require('querystring');

var pool = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user: 'root',
    password : '',
    database : 'delivery',
    debug : false
});
//app.use(express.bodyParser());
//app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({extended : false}));
/*app.use(function(res, req, next) {
    console.log(parseHeader(res.headers));
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log(parseHeader(res.headers));
    next();
});*/

function handle_database(req, res, query_) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        connection.query(query_, function(err, rows) {
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });
        connection.on('error', function(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        });
    });
}

app.get("/", function(req, res) {
    //handle_database(req, res);
});
app.get("/reset", function(req, res) {
    //reset_database(req, res);
/*
    handle_database(req, res, "DROP TABLE relation");
    handle_database(req, res, "DROP TABLE categories");
    handle_database(req, res, "DROP TABLE products");
    handle_database(req, res, "DROP TABLE orders");
    handle_database(req, res, "DROP TABLE ordersRelation");
*/
    handle_database(req, res, "CREATE TABLE relation(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, productId INT, categoryId INT)");
    handle_database(req, res, "CREATE TABLE categories(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), thumbnail LONGBLOB, shortDescription VARCHAR(255), lockField BOOLEAN, created VARCHAR(12), edited VARCHAR(12))");
    handle_database(req, res, "CREATE TABLE products(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), thumbnail LONGBLOB, inStock INT, price VARCHAR(255), currency VARCHAR(10), weight VARCHAR(255), shortDescription VARCHAR(255), description MEDIUMTEXT, lockField BOOLEAN, created VARCHAR(12), edited VARCHAR(12))");
    handle_database(req, res, "CREATE TABLE orders(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), additional VARCHAR(255), status VARCHAR(255), date VARCHAR(12), products VARCHAR(512))");
    handle_database(req, res, "CREATE TABLE ordersRelation(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, productId INT, amount INT)");
});
app.get("/categories", function(req, res) {
    //console.log(req);
    handle_database(req,res,"SELECT * from categories");

    console.log(parseHeader(req.headers));
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
});

app.post("/categories", function(req, res) {
    var body='';
    req.on('data', function (data) {
        body +=data;
    });
    req.on('end', function (){
        console.log(body);
        handle_database(req, res, "INSERT INTO categories ( name, shortDescription, description, lockField, created, edited ) VALUES ( " + body.name + "," + body.shortDescription +  "," + body.description + "," + body.lockField + "," + body.created + "," + body.edited + ")");
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
});
});


app.listen(3000);
/*
var sys = require ('sys'),
    url = require('url'),
    http = require('http'),
    qs = require('querystring');

http.createServer(function (req, res) {
    if(req.method=='POST') {
        var body='';
        req.on('data', function (data) {
            body +=data;
        });
        req.on('end',function(){
            var POST =  qs.parse(body);
            console.log(POST);
        });
    }
    else if(req.method=='GET') {
        var url_parts = url.parse(req.url,true);
        console.log(url_parts.query);
    }
}).listen(1337, "127.0.0.1");*/