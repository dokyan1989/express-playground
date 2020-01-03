const express = require('express');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const path = require('path');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const notFound = require('./src/controllers/not-found');
const errorHandler = require('./src/middleware/error-handler');
const { makeHandlerCallback } = require('./src/helpers/express-callback');

dotenv.config();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
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

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/', require('./src/routes/pages'));
app.use('/api/v1', require('./src/routes/api/v1'));
app.use(makeHandlerCallback(notFound));
app.use(errorHandler);

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
