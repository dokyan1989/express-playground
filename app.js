const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', require('./routes/api/index'));
app.use('/api/heroes', require('./routes/api/heroes'));
app.listen(port, () => console.log(`Server started on port ${port}!`));
