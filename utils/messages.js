const date = new Date()
const hour = date.getHours().toString()
const minute = date.getMinutes().toString()

function formatMessage(username, text) {
    return {
        username,
        text,
        time: `${hour} : ${minute}`
    }
}



module.exports = formatMessage