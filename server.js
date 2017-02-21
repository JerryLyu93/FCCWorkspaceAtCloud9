require('./config/index')
var express = require('express')
var timestamp = require('./api/timestamp')
var requestHeaderParser = require('./api/requestHeaderParser.js')
var app = express()

app.get('/imagesearch/:query', function (req, res) {
  if (!req.params.query) {
    res.send('this api need a query, just like "hostname/imagesearch/dog"')
  }
  let api = require('./api/image_search.js')
  api.search(req.params.query, function (result) {
    res.send(result)
  })
})
app.get('/latest/imagesearch', function (req, res) {
  let api = require('./api/image_search')
  api.getHistory((err, result) => {
    if (err) {
      res.send('look like something wrong: ' + err)
    } else {
      res.send(result)
    }
  })
})
app.get('/urlshortener/new/*', function (req, res) {
  let api = require('./api/url_shortener')
  api.insert(req.params[0], function (err, result) {
    if (err) {
      res.send(err)
    } else {
      result.shorturl = req.protocol + '://' + req.hostname + '/urlshortener/' + result.shorturl
      res.send(result)
    }
  })
})
app.get('/urlshortener/:shorturl', function (req, res) {
  let api = require('./api/url_shortener')
  api.get(parseInt(req.params.shorturl), function (err, result) {
    if (err) {
      res.send(err)
    } else {
      if (typeof result !== 'object') {
        res.send(result)
      } else {
        res.redirect(result.url)
      }
    }
  })
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
