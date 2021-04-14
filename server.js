let fs = require('fs')
let http = require('http')

let express = require('express')
let app = express()

let serverPort = 7554;


let server = http.createServer(app)
let io = require('socket.io')(server)

// app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))



io.sockets.on('connection', (socket) => {
    let room = "default";
    socket.on('config', config => {
        room = config.id
        socket.join(room)
        socket.clientType = config.type
        console.log("joined room " + room + " as " + socket.clientType)
    })
    .on('disconnect', () => {
    })
})


server.listen(serverPort, function() {
  console.log('server up and running at %s port', serverPort);
})
