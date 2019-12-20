const mongoose = require('mongoose');

module.exports = {
  isConnected: () => {
    return (mongoose.connection.readyState === 1);
  },
  connect: async () => {
    await mongoose.connect(`${process.env.DM_COMMENTS_DB_URL}/${process.env.DM_COMMENTS_DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};
