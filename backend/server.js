const express = require("express");
const cors = require('cors');
const {createServer} = require('http')
const routes = require("./router");
const mysqlDb = require('./model')
const app = express();
const port = 8000;
const bodyParser = require('body-parser')
const session = require('express-session');
const morgan = require('morgan');


const {Server} = require('socket.io');
const server = createServer(app)
const io = new Server(server, {cors: {orgin:'*'}});
  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 


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

//socket

io.on('connection', (socket) => {
  console.log("New client connected :::" + socket.id); 

  socket.on("sendMessage", (message) =>{ // Handle khi có sự kiện tên là sendDataClient từ phía client
    console.log(message)
    socket.broadcast.emit("receiveMessage", message);// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })
 
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
  
server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});