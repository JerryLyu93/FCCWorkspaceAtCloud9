"use static"
let mongodb = require('mongodb')

let MongoClient = mongodb.MongoClient

let url = process.env.DB_HOST

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err)
  } else {
    console.log('Connection established to', url)

    // do some work here with the database.

    //Close connection
    db.close()
  }
})
