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
    socket.on('config', conf => {
        room = conf.id
        socket.join(room)
        io.to(room).emit('goto', 0)
    })
    .on('switch', sw => {
         socket.broadcast.to(room).emit('switch', sw)
         console.log("In room ", room, sw)
    })
    .on('goto', nbr => {
         socket.broadcast.to(room).emit('goto', nbr)
         console.log("In room ", room, 'goto ', nbr)
    })
    .on('disconnect', () => {
        // déco
    })
})


server.listen(serverPort, function() {
  console.log('server up and running at %s port', serverPort);
})
