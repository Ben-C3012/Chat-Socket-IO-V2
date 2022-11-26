const dayjs = require('dayjs')

function formatMessage(username, text) {
    return {
        username,
        text,
        // time: moment().format('h:mm a')
        time: dayjs().hour() + ':' + dayjs().minute()
    }
}



module.exports = formatMessage