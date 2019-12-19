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
app.use('/api', require('./routes/api'));

app.use(makeCallback(notFound));

app.listen(process.env.PORT || 3000, () => console.log(`Server started on port ${process.env.PORT}!`));
