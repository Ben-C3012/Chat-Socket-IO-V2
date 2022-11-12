const socket = io();


// UI Elements 
const messageContainer = document.querySelector('.chat-messages')
const form = document.getElementById('chat-form')
const input = document.getElementById('msg')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params)
const { username, room } = params

// Join Chatroom 
socket.emit('joinRoom', { username, room })


form.addEventListener('submit', (event) => {
    event.preventDefault()
    let message = input.value
    if (message) {
        // Emit the message to the server
        socket.emit('chat message', message)
        input.value = ''
        input.focus()
    }
})

// Get Room and users 
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUsers(users)
})


socket.on('chat message', (msg) => {
    outputMessage(msg)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('bot message', (msg) => {
    outputMessage(msg)
    messageContainer.scrollTop = messageContainer.scrollHeight
})


function outputMessage(message) {
    const bluePrint =
        ` <div class="message">
        <p class="meta">${message.username}<span>${message.time}</span></p>
        <p class="text">
           ${message.text}
        </p>
        </div>`

    messageContainer.innerHTML += bluePrint
}




// Add room name to DOM 
function outputRoomName(room) {
     roomName.innerText = room
}

// Add Users to DOM 
function outputUsers(users) {
    userList.innerHTML = `
      ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}




// Leave Room 
document.getElementById('leave-btn').addEventListener('click', () => {
    confirm('Are You Sure?')
    window.location = '../index.html'
})






