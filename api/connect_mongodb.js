"use static"

let mongodb = require('mongodb')

let MongoClient = mongodb.MongoClient

let url = process.env.DB_HOST

/*
  @description 连接数据库, 接收一个callback
  @params {function} callback 连接数据库之后的回调, 接收一个db实例, 用于进行数据库操作, callback必须是一个promise
*/
function connectDB (callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err)
    } else {
      console.log('Connection established to', url)

      // do some work here with the database.
      callback(db).then((res) => {
        console.log('db operation is complete')
        db.close()
      }).catch((err) => {
        console.error('db operation had some error')
        console.error(err)
        db.close()
      })
    }
  })
}

module.exports = connectDB
