const buildMakeUser = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const makeUser = buildMakeUser({ jwt, bcrypt, crypto });

module.exports = makeUser;
