const mongoose = require('mongoose');
const errorHandler = require('../middleware/error-handler');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvailable: {
    type: Boolean,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  bootcampId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcampId }
    },
    {
      $group: {
        _id: '$bootcampId',
        averageCost: { $avg: '$tuition' }
      }
    }
  ]);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.err(err);
  }
};

// Call getAverageCost after save
CourseSchema.post('save', async function () {
  await this.constructor.getAverageCost(this.bootcampId);
});

// Call getAverageCost before remove
CourseSchema.pre('remove', async function () {
  await this.constructor.getAverageCost(this.bootcampId);
});

CourseSchema.post('save', errorHandler);
CourseSchema.post('findOne', errorHandler);
CourseSchema.post('findOneAndUpdate', errorHandler);

module.exports = mongoose.model('Course', CourseSchema);
