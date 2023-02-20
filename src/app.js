const express = require('express');
var cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
const swaggerUi = require('swagger-ui-express');
const swaggerApiDoc = require('./config/swagger.json');
const { sequelize } = require('./models');
sequelize.sync({ alter: true });
const config = require('./config/environments');

const indexRouter = require('./routes');
const eventsRouter = require('./routes/events');
const {HTTP_INTERNAL_SERVER_ERROR} = require("./config/constants");

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1/', indexRouter);
app.use('/v1/events', eventsRouter);
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerApiDoc));

app.use(function (err, req, res) {
  console.error(err);
  return res.status(HTTP_INTERNAL_SERVER_ERROR.code).send(HTTP_INTERNAL_SERVER_ERROR.message);
});
app.listen({ port: config.app.port }, async () => {
  console.info(`listening on port ${config.app.port}`);
});

module.exports = app;
