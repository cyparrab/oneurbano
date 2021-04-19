const express = require('express');
const riego = require('../services/Riego');

const router = new express.Router();


/**
 * Busca un riego generado
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
    searchString: req.query['searchString'],
    skip: req.query['skip'],
    limit: req.query['limit']
  };

  try {
    const result = await riego.buscarRiego(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Adiciona un riego al sistema
 */
router.post('/', async (req, res, next) => {
  const options = req.body;

  try {
    const result = await riego.addRiego(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
