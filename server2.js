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

var appRouter = express.Router();

categoryRouter.get('/', function(req, res) {});
//categoryRouter.get('/:id', function(req, res) {});
//categoryRouter.post('/', function(req, res) {});

// Attach the routers for their respective paths
app.use('/categories', appRouter);




function categoryLookup(req, res, next) {
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