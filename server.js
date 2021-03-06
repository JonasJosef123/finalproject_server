const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Jonas123',
    database : 'smart-brain'
  }
});


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*').from('users')
  .then(users => {
    res.json(users);
  })
})

app.post('/signin', (req,res) =>{
  signin.handleSignin(req,res,db,bcrypt)
})

app.post('/register', (req,res) => {
  register.handleRegister(req, res, db, bcrypt);
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req,res,db)
})

app.put('/image', (req,res) => {
  image.handleImage(req, res, db)
})

app.post('/imageurl', (req,res) => {
  image.handleAPICall(req, res);
})


app.listen(3001, ()=> {
  console.log('app is running on port 3001');
})
