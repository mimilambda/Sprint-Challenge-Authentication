const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUsers
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findUsers() {
    return db('users').select('id', 'username');
  }

function findBy(filter) {
  return db('users').where(filter);
}

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => ({ id: ids[0] }));
  }

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}