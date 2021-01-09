const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passport');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({ secret: '12345' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/user/logged', (req, res) => {
  res.render('logged');
});

app.get('/user/no-permission', (req, res) => {
  res.render('noPermission');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
(req, res) => {
  res.redirect('/user/logged');
}
);


app.get('/auth/google/callback', (req, res) => {
  res.send(`I'm back from Google!`);
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
