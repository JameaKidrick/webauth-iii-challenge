/*
GET -- /api/users -- If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.
*/


const express = require('express');

const router = express.Router();

const db = require('../helpers/usersModel');

router.get('/users', (req, res) => {
  db.find()
    .then(users => {
      // res.status(200).json(users)
      return users.filter(byDepartment => {
        console.log(byDepartment.department === req.decodeJwt.department)
      })
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' })
    })
})

module.exports = router;
