const mongoose = require('mongoose');

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
