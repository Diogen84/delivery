//https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6
var express = require('express');
var mysql = require("mysql");
var app = express();
var pool = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user: 'root',
    password : '',
    database : 'delivery',
    debug : false
});

app.use(function(res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
var categoryRouter = express.Router();

categoryRouter.get('/', categoryList, function(req, res) {});
//categoryRouter.get('/:id', function(req, res) {});
//categoryRouter.post('/', function(req, res) {});
app.use('/categories', categoryRouter);




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
    });

}

module.exports = app;

app.listen(3000);