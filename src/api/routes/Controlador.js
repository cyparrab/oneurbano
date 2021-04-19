const express = require('express');
const controlador = require('../services/Controlador');

const router = new express.Router();


/**
 * Buscar un controlador creado
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
    searchString: req.query['searchString'],
    skip: req.query['skip'],
    limit: req.query['limit']
  };

  try {
    const result = await controlador.buscarControlador(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Adiciona un controlador al sistema
 */
router.post('/', async (req, res, next) => {
  const options = req.body;

  try {
    const result = await controlador.addControlador(options);
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
    const result = await controlador.actualizarControlador(options);
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
    const result = await controlador.borrarControlador(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
