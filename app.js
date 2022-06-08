const express = require('express');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const fileUpload = require('express-fileupload');
const { backDate, limit, truncate, paginate } = require('./helpers/hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');

const mainRouter = require('./routes/mainRoutes');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/indexRoutes');
const contactRouter = require('./routes/contactRoutes');

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
app.use(methodOverride('_method'));

// Handlebars helpers
app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      frontDate: backDate,
      limit: limit,
      truncate: truncate,
      paginate: paginate,
    },
  })
);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Display Link Middleware
app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next();
});

// Flash - Message Middleware
app.use((req, res, next) => {
  res.locals.frontSessionFlash = req.session.backSessionFlash;
  delete req.session.backSessionFlash;
  next();
});

app.use('/', mainRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/contact', contactRouter);

module.exports = app;
