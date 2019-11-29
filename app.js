const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');

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

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running at port ${PORT}`)
);