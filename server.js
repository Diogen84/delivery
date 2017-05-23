var express = require("express");
var mysql = require("mysql");
var app = express();

var pool = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user: 'user1',
    password : 'qwerty',
    database : 'delivery',
    debug : false
});

function handle_database(req, res, query_) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            return;
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
            return;
        });
    });
}

function reset_database(req, res) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            return;
        }
        console.log("Connected as id " + connection.threadId);

       /* connection.query("DROP TABLE relation");
        connection.query("DROP TABLE categories");
        connection.query("DROP TABLE products");
        connection.query("DROP TABLE orders");
        connection.query("DROP TABLE ordersRelation");*/

        handle_database(req, res, "CREATE TABLE relation(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, productId INT, amount INT)");
        handle_database(req, res, "CREATE TABLE categories(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), thumbnail LONGBLOB, shortDescription VARCHAR(255), lockField BOOLEAN, created VARCHAR(12), edited VARCHAR(12))");
        handle_database(req, res, "CREATE TABLE products(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), thumbnail LONGBLOB, inStock INT, price VARCHAR(255), currency VARCHAR(10), weight VARCHAR(255), shortDescription VARCHAR(255), description MEDIUMTEXT, lockField BOOLEAN, created VARCHAR(12), edited VARCHAR(12))");
        handle_database(req, res, "CREATE TABLE orders(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), additional VARCHAR(255), status VARCHAR(255), date VARCHAR(12), products VARCHAR(512))");
        handle_database(req, res, "CREATE TABLE ordersRelation(id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, productId INT, amount INT)");

        connection.on('error', function(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            return;
        });
    });
}

app.get("/", function(req, res) {
    //handle_database(req, res);
});
app.get("/reset", function(req, res) {
    reset_database(req, res);
});
app.get("/categories", function(req, res) {
    handle_database(req,res,"SELECT * from categories");
});
app.listen(3000);