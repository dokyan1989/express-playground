const mongoose = require('mongoose');

let isOpen = false;
mongoose.connection.once('open', () => {
  isOpen = true;
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);
});

module.exports = {
  isOpen: () => isOpen,
  connect: async () => {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  }
};
