const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);
});

module.exports = {
  isConnected: () => {
    return (mongoose.connection.readyState === 1);
  },
  connect: async () => {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};
