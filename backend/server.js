const express = require("express");
const cors = require('cors');
const routes = require("./router");
const mysqlDb = require('./model')
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const session = require('express-session');
const morgan = require('morgan')

// Middleware

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: '12345', 
  cookie: { secure: false }
}));
app.use(bodyParser.json())

app.use(express.urlencoded({extended: false}))
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(__dirname + '/public/build'));
console.log(__dirname + '/public/build')

app.use("/api", routes);

mysqlDb.connection();

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});