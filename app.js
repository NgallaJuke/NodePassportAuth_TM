const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
//Store the message in a session and display it after we redirect  
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// DB config
const db = require('./config/keys').MongoURI;

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err)
  );


// VIEWS EJS Middlewar
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser middleware
app.use(express.urlencoded({ extended: false }));

// Express Session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Flash Middleware
app.use(flash());

// global variables that we can acces to when we register un new users in users.js
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running at port ${PORT}`)
);