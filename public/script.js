const socket = io();

// UI Elements 
const messageContainer = document.querySelector('.chat-messages')
const form = document.getElementById('chat-form')
const input = document.getElementById('msg')


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
        <p class="meta">User<span>9:43</span></p>
        <p class="text">
           ${message}
        </p>
        </div>`

    messageContainer.innerHTML += bluePrint
}





