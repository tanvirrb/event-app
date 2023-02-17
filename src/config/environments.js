module.exports = {
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV,
  },
  mysql: {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'db-server',
    rootUser: process.env.MYSQL_ROOT_USER || 'root',
    rootPassword: process.env.MYSQL_ROOT_PASSWORD || 'adminroot',
    database: process.env.MYSQL_DATABASE || 'events_db',
    username: process.env.MYSQL_USER || 'admin',
    password: process.env.MYSQL_PASSWORD || 'admin',
    dbPort: process.env.MYSQL_PORT || 3306,
    dbSslMode: process.env.MYSQL_SSL_MODE || false,
  },
};
