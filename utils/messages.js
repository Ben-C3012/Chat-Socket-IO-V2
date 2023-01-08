const dayjs = require('dayjs')
let now = dayjs();
const hour = now.hour();
const minute = now.minute();

function formatMessage(username, text) {
    return {
        username,
        text,
        time: `${hour}:${minute}`
    }
}

module.exports = formatMessage