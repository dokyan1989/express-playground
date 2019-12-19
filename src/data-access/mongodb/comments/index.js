const makeCommentsDb = require('./comments-db');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = process.env.DM_COMMENTS_DB_URL;
const dbName = process.env.DM_COMMENTS_DB_NAME;
const client = new MongoClient(url, { useNewUrlParser: true });

async function makeDb () {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

const commentsDb = makeCommentsDb({ makeDb });
module.exports = commentsDb;
