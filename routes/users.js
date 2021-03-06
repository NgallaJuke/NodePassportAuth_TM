const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');



// login page
router.get('/login', (req, res) => res.render('login'));
// register page
router.get('/register', (req, res) => res.render('register'));

// register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check required fields
  if (!name || !email || !password || !password2)
    errors.push({ msg: 'Please fill in all fields' });



  // check passwords matche
  if (password !== password2)
    errors.push({ msg: 'Passwords do not match' });

  if (password.length < 6)
    errors.push({ msg: 'Password should be at least 6 caracters' });

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // if there is no err at all we check if the user already exist in MongoDB

    User.findOne({ email: email })
      .then(user => {
        if (user) {
          // user exits
          errors.push({ msg: 'Email is already registered' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          //is the user doesn't exist the we create and hash is password before saving it
          const newUser = new User({
            name,
            email,
            password
          });

          // Hash the password with bcrypt
          // Generating a Salt
          bcrypt.genSalt(10, (err, salt) => {
            // Hashing the password with the salt
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Save the User in the Database
              newUser.save()//Saving the User in MongoDB
                .then(user => {
                  // Using the global variable success_msg created in app.js 
                  // using flash to render the message when we redirect
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
});

// Login Hadle wit passport
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  }
  )(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('succes_msg', 'You are logout');
  res.redirect('/users/login');
});
module.exports = router;

