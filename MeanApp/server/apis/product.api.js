var express = require('express'),
    httpStatus = require('http-status-codes');

var router = express.Router();

var product = require('../models/product');

//GET All
router.get('/', function(req, res) {
    product.find({}, function(err, data) {
        res.status(httpStatus.OK).send(data);
    });
}).get('/:id', function(req, res) {
    var id = req.params.id;
    product.findById(id, function(err, data) {
        res.status(httpStatus.OK).send(data[0]);
    });
}).post('/', function(req, res) {
    var obj = req.body;
    var objProd = new product(obj);
    objProd.save(function(err, data) {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        } else {
            res.status(httpStatus.CREATED).send();
        }
    });
}).delete('/:id', function(req, res) {
    var id = req.params.id;
    product.findByIdAndRemove(id, function(err) {
        if (err) res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        res.status(httpStatus.OK).send();
    });
});

module.exports = router;