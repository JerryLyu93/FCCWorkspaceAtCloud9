"use strict"
let moment = require("moment")

function handle (time) {
    if (time) {
        let date
        if (time.match(/\D+/g)) {
            date = moment(time)
        } else {
            date = moment(parseInt(time))
        }
        return {
          unix: date.valueOf(),
          natural: date.format('MMMM D, YYYY')
        }
    } else {
        return null
    }
   
}
    
module.exports = handle