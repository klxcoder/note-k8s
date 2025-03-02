const knex = require('knex');
const { databaseConnection } = require('./config');

module.exports = knex({
  client: 'mysql2',
  connection: databaseConnection,
});
