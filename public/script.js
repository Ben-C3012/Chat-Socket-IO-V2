const socket = io();

// UI Elements 
const messageContainer = document.querySelector('.chat-messages')
const form = document.getElementById('chat-form')
const input = document.getElementById('msg')


form.addEventListener('submit', (event) => {
    event.preventDefault()
    let message = input.value
    if (message) {
        socket.emit('chat message', message)
        input.value = ''
    }
})


socket.on('chat message', (msg) => {

    const bluePrint =
        ` <div class="message">
    <p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
         lorem ipsum
    </p>
</div>`


    messageContainer.insertAdjacentHTML('beforeend', bluePrint)

})

socket.on('welcome', (msg) => {
    const bluePrint =
        ` <div class="message">
<p class="meta">Bot<span></span></p>
<p class="text">
     ${msg}
</p>
</div>`

    messageContainer.insertAdjacentHTML('beforeend', bluePrint)


})





