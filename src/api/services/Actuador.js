const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.searchString Pasa un acadena de búsqueda opcional para buscar un Actuador
 * @param {Integer} options.skip Número de registros para omitir la paginación
 * @param {Integer} options.limit Número máximo de registros para devolver
 * @throws {Error}
 * @return {Promise}
 */
module.exports.buscarActuador = async (options) => {
  let client, db;
  console.log(options.searchString);
  try {
     const MongoClient = require('mongodb').MongoClient;
     const uri = process.env.MONGODB_URI;;
     client = await MongoClient.connect(uri, { useNewUrlParser: true });
     db = client.db("urbano1");
     let collection = db.collection('actuador');
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
    status: 200,
    data: 'buscarActuador ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.Actuador Adiciona un actuador
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addActuador = async (options) => {
  let client, db;
  try {
     const MongoClient = require('mongodb').MongoClient;
     const uri = process.env.MONGODB_URI;;

     client = await MongoClient.connect(uri, { useNewUrlParser: true });
     db = client.db("urbano1");
     let collection = db.collection('actuador');
     let result = await collection.insertOne(options);
     return {
        status: 200,
        data: 'addActuador ok!'
     };
  } catch (e) {
     console.error(e);
  } finally {
     client.close();
  }


  return {
    status: 500,
    data: 'addActuador not ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.id Actuador a actualizar
 * @param {Object} options.body Objeto de actuador actualizado
 * @throws {Error}
 * @return {Promise}
 */
module.exports.actualizarActuador = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'actualizarActuador ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.id Actuador a borrar
 * @throws {Error}
 * @return {Promise}
 */
module.exports.borrarActuador = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'borrarActuador ok!'
  };
};

