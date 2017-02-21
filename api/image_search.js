let connect = require('./connect_mongodb')
// googleAPI
var google = require('googleapis');
var customsearch = google.customsearch('v1');
var params = {
  key: 'AIzaSyA3prI-NXnN8pbb6ml1-8ltmJlPgtSmlf8',
  cx: '005638436848923125128:llucr27b3qi',
  q: 'dog',
  searchType: 'image',
  start: '0'
};

function search (query, offset, callback) {
  console.log(query, offset)
  query && (params.q = query)
  offset && (params.start = (offset - 1) * 10 + '')
  console.log(params)
  // 记录查询内容
  connect(function (db) {
    let searchHistory = db.collection('search_history')
    return new Promise((resolve, reject) => {
      searchHistory.insert({
        term: query,
        when: Date()
      }, function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  })

  customsearch.cse.list(params, function (err, response) {
    if (err) {
      console.log('Encountered error', err);
      callback(err, null)
    } else {
      callback(null, response.items)
    }
  });
}

function getHistory (callback) {
  connect(function (db) {
    let searchHistory = db.collection('search_history')
    return new Promise((resolve, reject) => {
      searchHistory.find({}, { term: 1, when: 1, _id: 0 }).sort({'_id': -1}).limit(10).toArray(function (err, result) {
        if (err) {
          callback(err, null)
          reject(err)
        } else {
          callback(null, result)
          resolve(result)
        }
      })
    })
  })
}
exports.search = search
exports.getHistory = getHistory
