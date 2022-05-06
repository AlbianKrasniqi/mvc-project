const express = require('express');
const { engine, asd } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const fileUpload = require('express-fileupload');
const mainRouter = require('./routes/mainRoutes');
const postsRouter = require('./routes/postsRoutes');
const moment = require('moment');

const app = express();

app.use(fileUpload());
app.use(express.static('public'));

app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      generateDate: (date, format) => {
        return moment(date).format(format);
      },
    },
  })
);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);
app.use('/posts', postsRouter);

module.exports = app;
