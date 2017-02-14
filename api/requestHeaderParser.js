"use strict"
let useragent = require('useragent')
function parser (req) {
  let useragentResult = useragent.parse(req.get('User-Agent'))
  return {
    ip: req.ip,
    language: req.get('Accept-Language').split(';')[0],
    software: useragentResult.toString()
  }
}

module.exports = parser
