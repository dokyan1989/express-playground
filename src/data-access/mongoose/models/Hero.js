const mongoose = require('mongoose');
const slugify = require('slugify');

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

HeroSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Hero', HeroSchema);
