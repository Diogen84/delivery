//https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var app = express();

app.use(bodyParser.json({type: 'application/json'}));

var pool = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user: 'root',
    password : '',
    database : 'delivery',
    debug : false
});
/*
app.use(function(res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
*/
var categoryRouter = express.Router();

categoryRouter.get('/', categoryList, function(req, res) {});
categoryRouter.post('/', categoryCreate, function(req, res) {});
categoryRouter.post('/delete/', categoryDelete, function(req, res) {});
categoryRouter.get('/:id', categoryDetails, function(req, res) {});

app.use('/categories', categoryRouter);

function categoryDelete(req, res, next) {
    var body='';
    req.on('data', function (data) {
        body +=data;
    });
    req.on('end', function (){
        pool.getConnection(function(err, connection) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            if(err) {
                res.json({
                    "code" : 100,
                    "status" : "Error in connection database"
                });
                //return;
            }
            connection.on('error', function(err) {
                res.json({
                    "code" : 100,
                    "status" : "Error in connection database"
                });
            });
            body = JSON.parse(body);
            console.log("Connected as id " + connection.threadId);
            connection.query("DELETE FROM categories WHERE id = " + body.id, function(err, rows) {
                connection.release();
                if (!err) {
                    res.statusCode = 201;
                    res.json(rows);
                } else {
                    console.log(err);
                    res.json({
                        "code" : 500,
                        "status" : "Error in connection database"
                    });
                }
                next();
            });

        });
    });
}

function categoryList(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        connection.query("SELECT * from categories", function(err, rows) {
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
        });

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    });
}

function categoryCreate(req, res, next) {
    var body='';
    req.on('data', function (data) {
        body +=data;
    });
    req.on('end', function (){
        pool.getConnection(function(err, connection) {
            if(err) {
                res.json({
                    "code" : 100,
                    "status" : "Error in connection database"
                });
                //return;
            }
            connection.on('error', function(err) {
                res.json({
                    "code" : 100,
                    "status" : "Error in connection database"
                });
            });
            var bodyJson = JSON.parse(body);
            console.log("Connected as id " + connection.threadId);
            connection.query("INSERT INTO categories ( name, shortDescription, description, created, edited ) VALUES ( '" + bodyJson.name + "','" + bodyJson.shortDescription + "','" + bodyJson.description + "','" + bodyJson.created + "','" + bodyJson.edited + "')", function (err, rows) {
                connection.release();
                if (!err) {
                    bodyJson.id = rows.insertId;
                    res.statusCode = 201;
                    res.json(bodyJson);
                } else {
                    console.log(err);
                    res.json({
                        "code" : 500,
                        "status" : "Error in connection database"
                    });
                }
            });

            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
        });
    });
}

function categoryDetails(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        connection.query("SELECT * from categories where id = " + req.params.id, function(err, rows) {
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
        });

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    });
}

module.exports = app;

app.listen(3000);