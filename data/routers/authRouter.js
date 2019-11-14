/*
POST -- /api/register -- Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.

POST -- /api/login -- Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'
*/

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const db = require('../helpers/usersModel');

function getJwtToken(id){
  const payload = {
    id,
    role: 'webdev'
  };

  const secret = process.env.JWT_SECRET || 'secret'; // create secret in env

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}

router.post('/register', (req, res) => {
  const user = req.body;
  
  if(!user.username || !user.password){
    return res.status(400).json({ error: 'Please provide a username and password.' })
  }else if(!user.department){
    return res.status(400).json({ error: 'Please provide your department' })
  }else{
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  }

  db.add(user)
    .then(store => {
      res.status(201).json({ message: `New user stored:`, user });
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    res.status(400).json({ error: 'Please provide a username and password.' })
  }else{
    db.findBy({ username })
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
          const token = getJwtToken(user.id) // produce a token

          res.status(200).json({ message: `Welcome ${user.username}! Here's your token: ${token}.` });
        }else{
          res.status(401).json({ message: 'Invalid credentials. Try again later.' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      })
  }
})

module.exports = router;