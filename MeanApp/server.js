const express = require('express'),
    bodyParser = require('body-parser'),
    connection= require('./server/config/db'),
    expressSession= require('express-session'),
    apiRoutes = require('./server/routes/apiRoutes'),
    webRoutes= require('./server/routes/webRoutes');

const app = express();

//session
app.use(expressSession({
    secret: 'mytoken',
    saveUninitialized: true,
    resave: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/', webRoutes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 1300;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

