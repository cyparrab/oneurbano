const express = require('express');
const actuador = require('../services/Actuador');

const router = new express.Router();


/**
 * Buscar un actuador creado
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
    searchString: req.query['searchString'],
    skip: req.query['skip'],
    limit: req.query['limit']
  };

  try {
    const result = await actuador.buscarActuador(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Adiciona un actuador al sistema
 */
router.post('/', async (req, res, next) => {
  const options = req.body;
  try {
    const result = await actuador.addActuador(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Esta acción solamente puede ser ejecutada por un usuario 
 * logueado.
 */
router.put('/', async (req, res, next) => {
  const options = {
    id: req.query['id'],
    body: req.body['body']
  };

  try {
    const result = await actuador.actualizarActuador(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Esta acción solamente puede ser realizada por el usuario 
 * logueado.
 */
router.delete('/', async (req, res, next) => {
  const options = {
    id: req.query['id']
  };

  try {
    const result = await actuador.borrarActuador(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
