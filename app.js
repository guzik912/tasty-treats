require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const inquiriesRoute = require('./routes/inquiries');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/404', function (req, res) {
  res.render('404', { error: false });
});

app.use('/inquiries', inquiriesRoute);


app.listen(PORT, () => console.log(`Application listening on port: ${PORT}`));
