var expresss = require("express");
var router = expresss.Router();

var role = require("../models/role.js");

router.get("/", function(req, res) {
        role.find({}, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send(data);
        });
    })
    .get("/:id", function(req, res) {
        var id = req.params.id;
        role.findById(id, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send(data);
        });
    }).post("/", function(req, res) {
        var body = req.body;
        var obj = new role(body);
        obj.save(function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send("created");
        });
    })
    .put("/:id", function(req, res) {
        var id = req.params.id;
        var body = req.body;
        var obj = new role(body);
        role.findByIdAndUpdate(id, obj, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send("updated");
        });
    })
    .delete("/:id", function(req, res) {
        var id = req.params.id;
        role.findByIdAndRemove(id, function(err, data) {
            if (err)
                res.send(err.stack);
            else
                res.send("deleted");
        });
    });

module.exports = router;