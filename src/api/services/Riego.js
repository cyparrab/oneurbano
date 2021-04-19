const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.searchString Pasa una cadena de búsqueda opcional para buscar un riego
 * @param {Integer} options.skip Número de registros para omitir la paginación
 * @param {Integer} options.limit Número máximo de registros para devolver
 * @throws {Error}
 * @return {Promise}
 */
module.exports.buscarRiego = async (options) => {
  let client, db;
  console.log(options.searchString);
  try {
     const MongoClient = require('mongodb').MongoClient;
     const uri = process.env.MONGODB_URI;
     client = await MongoClient.connect(uri, { useNewUrlParser: true });
     db = client.db("urbano1");
     let collection = db.collection('riego');
     let result = await collection.find(JSON.parse(options.searchString)).toArray();
     return {
        status: 200,
        data: result
     };
  } catch (e) {
     console.error(e);
  } finally {
     client.close();
  }
  return {
     status: 500,
     data: 'buscarRiego not ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.Riego Adiciona un riego
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addRiego = async (options) => {
  let client, db;
  try {
     const MongoClient = require('mongodb').MongoClient;
     const uri = process.env.MONGODB_URI;

     client = await MongoClient.connect(uri, { useNewUrlParser: true });
     db = client.db("urbano1");
     let collection = db.collection('riego');
     let result = await collection.insertOne(options);
     return {
        status: 200,
        data: 'addRiego ok!'
     };
  } catch (e) {
     console.error(e);
  } finally {
     client.close();
  }

  return {
     status: 500,
     data: 'addRiego not ok!'
  };
};

