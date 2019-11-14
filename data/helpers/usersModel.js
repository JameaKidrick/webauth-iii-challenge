/*
GET -- /api/users -- If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.
*/

const db = require('../dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('users')
}

function findBy(info) {
  return db('users')
    .where(info)
    .first();
};

function findById(id) {
  return db('users')
    .where({'users.id':id})
    .first();
};

function add(user) {
  return db('users')
    .insert(user)
    .then(id => {
      return findById([id])
    });
};

function update() {

}

function remove() {

}