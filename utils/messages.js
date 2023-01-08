var spacetime = require('spacetime')
var d = spacetime.now('Asia/Jerusalem')


function formatMessage(username, text) {
    return {
        username,
        text,
        time: `${d.format('hour')}:${d.format('minute')}`
    }
}

module.exports = formatMessage