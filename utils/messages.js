const moment = require('moment')

function formatMessage(username, text) {
    return {
        username,
        text,
        time: `${moment().get('hour')}:${moment().get('minute')}`
    }
}

module.exports = formatMessage