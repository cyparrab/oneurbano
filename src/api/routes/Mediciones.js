const express = require('express');
const mediciones = require('../services/Mediciones');

const router = new express.Router();


/**
 * Buscar una medición registrada
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
    searchString: req.query['searchString'],
    skip: req.query['skip'],
    limit: req.query['limit']
  };

  try {
    const result = await mediciones.buscarMediciones(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Adiciona una medición al sistema
 */
router.post('/', async (req, res, next) => {
  const options = {
    Mediciones: req.body['Mediciones']
  };

  try {
    const result = await mediciones.addMediciones(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
