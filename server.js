require('./config/index')
var express = require('express')
var timestamp = require('./api/timestamp')
var requestHeaderParser = require('./api/requestHeaderParser.js')
var app = express()

app.get('/urlshortener', function (req, res) {
  let api = require('./api/url_shortener')
  api.connectDB()
  res.send('wow')
})
app.get('/timestamp/:time', function (req, res) {
    // res.writeHead(200, 'Content-type: application/json')
  res.send(JSON.stringify(timestamp(req.params.time)))
})
app.get('/headerparser', function (req, res) {
  res.send(requestHeaderParser(req))
})
app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!')
})
