const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../lib/config');
const logger = require('../lib/logger');
let cors = require('cors');
const log = logger(config.logger);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
 * Routes
 */
app.use('/drcolonia/OneUrbano/1.0.0/Riego', require('./routes/Riego'));
app.use('/drcolonia/OneUrbano/1.0.0/Mediciones', require('./routes/Mediciones'));
app.use('/drcolonia/OneUrbano/1.0.0/Cliente', require('./routes/Cliente'));
app.use('/drcolonia/OneUrbano/1.0.0/Actuador', require('./routes/Actuador'));
app.use('/drcolonia/OneUrbano/1.0.0/Controlador', require('./routes/Controlador'));
app.use('/drcolonia/OneUrbano/1.0.0/Cultivo', require('./routes/Cultivo'));

// catch 404
app.use((req, res, next) => {
  log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});


module.exports = app;
