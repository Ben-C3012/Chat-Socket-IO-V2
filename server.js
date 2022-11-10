const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')



// Serve files from static folder
const filePath = path.join(__dirname, 'public')
app.use(express.static(filePath))


// Socket.io Intergation
const { Server } = require('socket.io')
const io = new Server(server)

// Socket.io connection + Events 
io.on('connection', socket => {

    // Welcome current user
    socket.emit('bot message', 'Welcome To The Chat')

    //  Broadcast to everyone except the connected user
    socket.broadcast.emit('bot message', 'A New User Connected')



    socket.on('chat message', message => {
        io.emit('chat message', message)
    })


    socket.on('disconnect', () => {
        io.emit('bot message', 'A User left the chat')
    })


})






const PORT = 3000
server.listen(PORT, () => {
    console.log('Server is running on Port ' + PORT + '💻')
})