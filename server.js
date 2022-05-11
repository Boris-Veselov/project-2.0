const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

const router = require('express').Router();

// app.get('/', (req, res) => {
//   res.send('home');
// });

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on controllers
app.use(require('./controllers/'));


// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
