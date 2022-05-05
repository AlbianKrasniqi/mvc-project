const express = require('express');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const fileUpload = require('express-fileupload');

const mainRouter = require('./routes/mainRoutes');
const postsRouter = require('./routes/postsRoutes');

const app = express();

app.use(fileUpload());
app.use(express.static('public'));

app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);
app.use('/posts', postsRouter);

module.exports = app;
