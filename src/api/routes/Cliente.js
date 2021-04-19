const express = require('express');
const cliente = require('../services/Cliente');

const router = new express.Router();


/**
 * Busca un cliente creado
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
    searchString: req.query['searchString'],
    skip: req.query['skip'],
    limit: req.query['limit']
  };

  try {
    const result = await cliente.buscarCliente(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Adiciona un cliente al sistema
 */
router.post('/', async (req, res, next) => {
  const options = req.body;

  try {
    const result = await cliente.addCliente(options);
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
    usuario: req.query['usuario'],
    body: req.body['body']
  };

  try {
    const result = await cliente.actualizarCliente(options);
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
    usuario: req.query['usuario']
  };

  try {
    const result = await cliente.borrarCliente(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
  });
/**
 * Autentica un cliente al sistema
 */
  router.post('/autenticar', async (req, res, next) => {
  const options = {
    usuario: req.body['usuario'],
    contrasena: req.body['contrasena']
  };

  try {
    const result = await cliente.autenticarCliente(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
