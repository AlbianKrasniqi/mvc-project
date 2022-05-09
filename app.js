const express = require('express');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const fileUpload = require('express-fileupload');
const { backDate } = require('./helpers/date');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const mainRouter = require('./routes/mainRoutes');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(
  session({
    secret: 'testtest',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.mongoUrl,
    }),
  })
);
app.use(fileUpload());
app.use(express.static('public'));

app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { frontDate: backDate },
  })
);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

module.exports = app;
