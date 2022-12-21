const dayjs = require('dayjs')
let now = dayjs();

function formatMessage(username, text) {
    return {
        username,
        text,
        time: `${now.hour()}:${now.minute()}`
    }
}

module.exports = formatMessage