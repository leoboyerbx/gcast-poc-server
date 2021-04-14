let fs = require('fs')
let http = require('http')
const cors = require('cors')

let express = require('express')
let app = express()

app.use(cors())

let serverPort = 7554;


let server = http.createServer(app)
let io = require('socket.io')(server)

// app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

function bindInGameEvents (socket, room) {

}

io.sockets.on('connection', (socket) => {
    let room = "default";
    socket.on('config', config => {
        room = config.id
        socket.join(room)
        socket.clientType = config.type
        console.log("A client joined room " + room + " as " + socket.clientType)

        const clientsInRoom = Array.from(io.sockets.adapter.rooms.get(room))
        const clientTypes = clientsInRoom.map(clientId => {
            const client = io.sockets.sockets.get(clientId)
            return client.clientType
        })
        bindInGameEvents(socket, room)
        if (clientTypes.includes('cast') && clientTypes.includes('player')) {
            io.to(room).emit('ready')
        }
    })
    .on('disconnect', () => {
    })
})


server.listen(serverPort, function() {
  console.log('server up and running at %s port', serverPort);
})
