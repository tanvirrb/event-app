const express = require('express');
const logger = require('morgan');
require('dotenv').config({ path: `${__dirname}/../.env` });
const config = require('./config/environments');

const indexRouter = require('./routes');
const eventsRouter = require('./routes/events');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1/', indexRouter);
app.use('/v1/events', eventsRouter);

app.listen({ port: config.app.port }, async () => {
  console.info(`listening on port ${config.app.port}`);
});

module.exports = app;
