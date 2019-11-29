const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');

const app = express();

// DB config
const db = require('./config/keys').MongoURI;
// Connect to mongo
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Mongo DB connected'))
  .catch(err => console.log(err)
  );


// VIEWS EJS Middlewar
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running at port ${PORT}`)
);