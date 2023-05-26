const path = require ('path');
const express = require('express');

const sequelize = require('./config/connection');
const SequelizeStore = require('conection-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.port || 3009;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  }



app.use(express.json());
app.use(session(sess));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });