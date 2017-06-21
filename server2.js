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

var categoryRouter = express.Router();
var productRouter = express.Router();
var relationRouter = express.Router();

categoryRouter.get('/', categoryList, function(req, res) {});
categoryRouter.get('/:id', categoryDetails, function(req, res) {});
categoryRouter.post('/', categoryCreate, function(req, res) {});
categoryRouter.post('/delete/', categoryDelete, function(req, res) {});
app.use(function(res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/categories', categoryRouter);

productRouter.get('/', productList, function(req, res) {});
productRouter.get('/:id', productDetails, function(req, res) {});
productRouter.post('/', productCreate, function(req, res) {});
productRouter.post('/delete/', productDelete, function(req, res) {});
app.use(function(res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/products', productRouter);

relationRouter.get('/', relationList, function(req, res) {});
relationRouter.get('/product/:productId', relationDetails, function(req, res) {});
relationRouter.get('/category/:categoryId', relationCategoryDetails, function(req, res) {});
relationRouter.post('/', relationCreate, function(req, res) {});
relationRouter.post('/delete/', relationDelete, function(req, res) {});
app.use(function(res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/relation', relationRouter);


function relationDelete(req, res, next) {
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
            console.log(body);
            console.log("Connected as id " + connection.threadId);
            connection.query("DELETE FROM relation WHERE id = " + body.id, function(err, rows) {
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
function relationCreate(req, res, next) {
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
            connection.query("INSERT INTO relation ( productId, categoryId) VALUES ('" + bodyJson.productId + "','" + bodyJson.categoryId + "')", function (err, rows) {
                connection.release();
                if (!err) {
                    bodyJson.productId = rows.insertId;
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
function relationCategoryDetails(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        console.log("the ID is : " + req.params.categoryId);
        connection.query("SELECT * from relation where categoryId = " + req.params.categoryId, function(err, rows) {
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
function relationDetails(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        console.log("the ID is : " + req.params.productId);
        connection.query("SELECT * from relation where productId = " + req.params.productId, function(err, rows) {
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
function relationList(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        connection.query("SELECT * from relation", function(err, rows) {
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

function productCreate(req, res, next) {
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
            connection.query("INSERT INTO products ( name, inStock, price, currency, weight, shortDescription, description, created, edited) VALUES ('" + bodyJson.name + "','" + bodyJson.inStock + "','" + bodyJson.price + "','" + bodyJson.currency + "','" + bodyJson.weight + "','" + bodyJson.shortDescription + "','" + bodyJson.description + "','" + bodyJson.created + "','" + bodyJson.edited + "')", function (err, rows) {
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

function productDelete(req, res, next) {
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
            console.log(body);
            console.log("Connected as id " + connection.threadId);
            connection.query("DELETE FROM products WHERE id = " + body.id, function(err, rows) {
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
function productList(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        connection.query("SELECT * from products", function(err, rows) {
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
function productDetails(req, res, next) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        connection.query("SELECT * from products where id = " + req.params.id, function(err, rows) {
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