const {
  mysql: { password, host, database, username, dbPort, dialect },
} = require('./environments');

module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
    logging: false,
    port: dbPort,
  },
  test: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
    logging: false,
    port: dbPort,
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
    port: dbPort,
  },
};
