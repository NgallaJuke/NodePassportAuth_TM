const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const app = express();


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