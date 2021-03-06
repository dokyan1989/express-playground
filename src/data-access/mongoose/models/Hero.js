const mongoose = require('mongoose');
const slugify = require('slugify');
const errorHandler = require('../middleware/error-handler');

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slugName: String,
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
  id: false,
  collection: 'heroes'
});

HeroSchema.pre('save', function (next) {
  this.slugName = slugify(this.name, { lower: true });
  next();
});

HeroSchema.post('save', errorHandler);
HeroSchema.post('findOne', errorHandler);

module.exports = mongoose.model('Hero', HeroSchema);
