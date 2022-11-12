const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')


// Serve files from static folder
const filePath = path.join(__dirname, 'public')
app.use(express.static(filePath))


// Socket.io Intergation
const { Server } = require('socket.io')
const io = new Server(server)

// Socket.io connection + Events 
io.on('connection', socket => {

    // Get room and username from frontend
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)

        socket.join(user.room)

        // Welcome current user - Msg from server
        socket.emit('bot message', formatMessage('Bot', 'Welcome To The Chat'))

        //  Broadcast to everyone except the connected user
        socket.broadcast.to(user.room).emit('bot message', formatMessage('bot', `${user.username} has joined the chat`))

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })


        // Listen For Chat Message
        socket.on('chat message', message => {
            const user = getCurrentUser(socket.id)

            io.emit('chat message', formatMessage(user.username, message))
        })


    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if (user) {
            io.to(user.room).emit('bot message', formatMessage('Bot', `A ${user.username} left the chat`))
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
    
        }
    })

})






const PORT = 3000
server.listen(PORT, () => {
    console.log('Server is running on Port ' + PORT + '💻')
})