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
    console.log('A User Connected')


    socket.on('chat message', message => {
        io.emit('chat message', message)
    })


    socket.on('disconnect', () => {
        console.log('A User Disconnected')
    })


})






const PORT = 3000
server.listen(PORT, () => {
    console.log('Server is running on Port ' + PORT + '💻')
})