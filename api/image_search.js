let connect = require('./connect_mongodb')
// googleAPI
var google = require('googleapis');
var customsearch = google.customsearch('v1');
var params = {
  key: 'AIzaSyA3prI-NXnN8pbb6ml1-8ltmJlPgtSmlf8',
  cx: '005638436848923125128:llucr27b3qi',
  q: 'dog',
  searchType: 'image'
};

function search (query, callback) {
  query && (params.q = query)
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
    } else {
      console.log('Long url is', response);
    }
    callback(response)
  });
}

function getHistory (callback) {
  connect(function (db) {
    let searchHistory = db.collection('search_history')
    return new Promise((resolve, reject) => {
      searchHistory.find().limit(10).toArray(function (err, result) {
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
