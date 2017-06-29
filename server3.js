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
categoryRouter.post('/update/', categoryUpdate, function(req, res) {});
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
productRouter.post('/update/', productUpdate, function(req, res) {});
app.use(function(res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/products', productRouter);

relationRouter.get('/', relationList, function(req, res) {});
relationRouter.get('/product/:id', relationToProduct, function(req, res) {});
relationRouter.get('/category/:id', relationToCategory, function(req, res) {});
relationRouter.post('/', relationCreate, function(req, res) {});
relationRouter.post('/product/delete/', relationDelete, function(req, res) {});
app.use(function(res, req, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/relation', relationRouter);

function categoryDelete(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            id : body.id
        };
        postRequest(req, res, next, body, "DELETE FROM categories WHERE ?", postData);
    });
}
function categoryList(req, res, next) {
    return getRequest(req, res, next, "SELECT * from categories ");
}
function categoryDetails(req, res, next) {
    return getRequest(req, res, next, "SELECT * from categories where id = ");
}
function categoryCreate(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            name : body.name,
            shortDescription: body.shortDescription,
            description:body.description,
            created :body.created,
            edited :body.edited
        };
        postRequest(req, res, next, body, "INSERT INTO categories SET ?", postData);
    });
}
function categoryUpdate(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            name : body.name,
            shortDescription:body.shortDescription,
            description:body.description,
            edited :body.edited
        };
        postRequest(req, res, next, body, "UPDATE categories SET ? WHERE ?", postData);
    });
}
function productList(req, res, next) {
    return getRequest(req, res, next, "SELECT * from products");
}
function productDetails(req, res, next) {
    return getRequest(req, res, next, "SELECT * from products WHERE id = ");
}
function productCreate(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            name : body.name,
            inStock : body.inStock,
            price: body.price,
            currency: body.currency,
            weight: body.weight,
            shortDescription: body.shortDescription,
            description:body.description,
            created: body.created,
            edited :body.edited
        };
        postRequest(req, res, next, body, "INSERT INTO products SET ?", postData);
    });
}
function productDelete(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            id : body.id
        };
        postRequest(req, res, next, body, "DELETE FROM products WHERE ?", postData);
    });
}
function productUpdate(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            name : body.name,
            inStock : body.inStock,
            price: body.price,
            currency: body.currency,
            weight: body.weight,
            shortDescription: body.shortDescription,
            description:body.description,
            edited :body.edited
        };
        postRequest(req, res, next, body, "UPDATE products SET ? WHERE ?", postData);
    });
}
function relationList(req, res, next) {
    return getRequest(req, res, next, "SELECT * from relation");
}
function relationToProduct(req, res, next) {
    return getRequest(req, res, next, "SELECT * from relation where productId = ");
}
function relationToCategory(req, res, next) {
    return getRequest(req, res, next, "SELECT * from relation where categoryId = ");
}
function relationCreate(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            productId : bodyJson.productId,
            categoryId : bodyJson.categoryId
        };
        postRequest(req, res, next, body, "INSERT INTO relation SET ?", postData);
    });
}
function relationDelete(req, res, next) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function (){
        var postData = {
            productId : bodyJson.body.id
        };
        postRequest(req, res, next, body, "DELETE FROM relation WHERE ?", postData);
    });
}

function postRequest(req, res, next, body, query, postDataObject) {
    pool.getConnection(function(err, connection) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
        }
        connection.on('error', function(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
        });
        body = JSON.parse(body);
        console.log("Connected as id " + connection.threadId);
        if(typeof body.id == 'number') {
            var condition = {id:body.id};
            connection.query(query, [postDataObject, condition], function (err, rows) {
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
        } else {
            connection.query(query, [postDataObject], function (err, rows) {
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
        }
    });
}
function getRequest(req, res, next, query) {
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 100,
                "status" : "Error in connection database"
            });
            //return;
        }
        console.log("Connected as id " + connection.threadId);
        if(req.params.id) {
            connection.query(query + req.params.id, function(err, rows) {
                connection.release();
                if(!err) {
                    res.json(rows);
                }
            });
        } else {
            connection.query(query, function(err, rows) {
                connection.release();
                if(!err) {
                    res.json(rows);
                }
            });
        }
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