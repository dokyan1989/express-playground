const express = require('express');
const cors = require('cors');

const notFound = require('./controllers/not-found');
const makeCallback = require('./helpers/express-callback');

require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
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

app.use('/', require('./routes/pages'));
app.use('/api/v1', require('./routes/api/v1'));
app.use(makeCallback(notFound));
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
