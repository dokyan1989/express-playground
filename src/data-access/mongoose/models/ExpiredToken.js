const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const errorHandler = require('../middleware/error-handler');

const ExpiredTokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  slugName: String,
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true, versionKey: false },
  toObject: { virtuals: true, versionKey: false },
  id: false
});

// Encrypt password using bcrypt
ExpiredTokenSchema.pre('save', async function (next) {
  this.slugName = slugify(this.name, { lower: true });
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

ExpiredTokenSchema.post('save', errorHandler);
ExpiredTokenSchema.post('findOne', errorHandler);

module.exports = mongoose.model('User', ExpiredTokenSchema);
