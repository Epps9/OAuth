const express = require('express');
const router = express.Router();

const isLogged = (req, res, next) => {
    if(req.user){
      res.redirect('/profile');
      console.log(req.user);
    } else {
      next();
    }
  };

router.get('/logged', (req, res) => {
  if(typeof user ==! undefined) {return req.user};
  res.render('logged', {name: req.user.name.givenName});
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', isLogged, (req, res) => {
    res.render('profile');
})

router.get('/profile/settings', isLogged, (req, res) => {
    res.render('settings');
});


module.exports = router;
