const makeUsersDb = require('./users-db');
const db = require('../db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function makeDb () {
  if (!db.isOpen()) {
    await db.connect();
  }
  return {
    users: User
  };
}

const usersDb = makeUsersDb({ makeDb, bcrypt });
module.exports = usersDb;
