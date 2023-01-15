const axios = require('axios')
var moment = require('moment-timezone');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().tz("Asia/Jerusalem").format('HH:mm')
    }
}


module.exports = formatMessage