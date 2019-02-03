var express = require('express'),
    httpStatus = require('http-status-codes');

var router = express.Router();
var path = require("path");

var multer = require('multer');
var filePath = path.join(__dirname, '../../src/assets');

var absPath = "";

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, filePath);
    },
    filename: function(req, file, callback) {
        var arr = file.originalname.split('.');
        var fileExt = arr[arr.length - 1];
        var filename = file.fieldname + '-' + Date.now() + '.' + fileExt;
        absPath = '../assets' + "/" + filename;
        callback(null, filename);
    }
});

//'file' is the name of passing parameters
var upload = multer({
    storage: storage
}).single('file');

router.post('/', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send("error");
            return;
        }
        res.status(httpStatus.OK).json({
            filePath: absPath
        });
    });
});

module.exports = router;