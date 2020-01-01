const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const path = require('path');
const notFound = require('./controllers/not-found');
const { makeHandlerCallback } = require('./helpers/express-callback');

require('dotenv').config();

const app = express();
const whitelist = ['http://localhost:4200', 'http://localhost:5000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/pages'));
app.use('/api/v1', require('./routes/api/v1'));
app.use(makeHandlerCallback(notFound));
app.use(require('./middleware/error-handler'));

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
