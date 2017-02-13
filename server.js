var express = require('express')
var timestamp = require('./api/timestamp')
var app = express()


app.get('/timestamp/:time', function (req, res) {
    // res.writeHead(200, 'Content-type: application/json')
    res.send(JSON.stringify(timestamp(req.params.time)))
})
app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})