let connect = require('./connect_mongodb.js')

function insertNewRedirect (url, callback) {
  connect(function (db) {
    let shorturl = db.collection('shorturl')
    return new Promise((resolve, reject) => {
      // 首先查找该url是否已经存在于数据库中
      shorturl.find({original_url: url}).toArray(function (err, result) {
        if (err) {
          callback(err, null)
          reject(err)
        } else if (result.length) {
          callback(null, {
            original_url: result[0].original_url,
            shorturl: result[0].shorturl
          })
          resolve(result)
        } else {
          let cursor = shorturl.find().sort({'shorturl': -1})
          cursor.nextObject(function (err, result) {
            if (err) {
              reject(err)
            }
            let id = 0
            if (result) {
              id = result.shorturl
            }
            shorturl.insert({
              original_url: url,
              shorturl: id += 1
            }, function (err, result) {
              if (err) {
                callback(err, null)
                reject(err)
              } else {
                callback(null, {
                  original_url: result.ops[0].original_url,
                  shorturl: result.ops[0].shorturl
                })
                resolve(result)
              }
            })
          })
        }
      })
    })
  })
}
function getShorturl (shorturl, callback) {
  connect(function (db) {
    let collection = db.collection('shorturl')
    return new Promise((resolve, reject) => {
      collection.find({shorturl: shorturl}).toArray((err, result) => {
        if (err) {
          callback(err, null)
          reject(err)
        } else {
          if (result.length) {
            callback(null, {
              url: result[0].original_url
            })
          } else {
            callback("this shorturl has no original url")
          }
          resolve(result)
        }
      })
    })
  })
}
exports.insert = insertNewRedirect
exports.get = getShorturl
