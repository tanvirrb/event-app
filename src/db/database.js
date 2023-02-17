const { Sequelize } = require('sequelize');
const {
  mysql: { password, host, username, dbPort, database, dialect },
} = require('../config/environments');

const sequelize = new Sequelize(database, username, password, {
  host,
  post: dbPort,
  dialect: dialect,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.info('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Database connection fail', err);
  });

module.exports = sequelize;
