const moment = require('moment')
const axios = require('axios')

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('').slice(11, 16)  
    }
}


module.exports = formatMessage