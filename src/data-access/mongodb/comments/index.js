const makeCommentsDb = require('./comments-db');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function makeDb () {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

const commentsDb = makeCommentsDb({ makeDb });
module.exports = commentsDb;
