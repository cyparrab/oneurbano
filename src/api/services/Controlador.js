const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.searchString Pasa un acadena de búsqueda opcional para buscar un controlador
 * @param {Integer} options.skip Número de registros para omitir la paginación
 * @param {Integer} options.limit Número máximo de registros para devolver
 * @throws {Error}
 * @return {Promise}
 */
module.exports.buscarControlador = async (options) => {
  let client, db;
  console.log(options.searchString);
  try {
     const MongoClient = require('mongodb').MongoClient;
     const uri = process.env.MONGODB_URI;
     client = await MongoClient.connect(uri, { useNewUrlParser: true });
     db = client.db("urbano1");
     let collection = db.collection('controlador');
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
     data: 'buscarControlador not ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.Cultivo Adiciona un controlador
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addControlador = async (options) => {
  let client, db;
  try {
     const MongoClient = require('mongodb').MongoClient;
     const uri = process.env.MONGODB_URI;

     client = await MongoClient.connect(uri, { useNewUrlParser: true });
     db = client.db("urbano1");
     let collection = db.collection('controlador');
     let result = await collection.findOneAndDelete({"id":options.id});
     result = await collection.insertOne(options);
     return {
        status: 200,
        data: 'addControlador ok!'
     };
  } catch (e) {
     console.error(e);
  } finally {
     client.close();
  }

  return {
     status: 500,
     data: 'addControlador not ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.id Controlador a actualizar
 * @param {Object} options.body Objeto de controlador actualizado
 * @throws {Error}
 * @return {Promise}
 */
module.exports.actualizarControlador = async (options) => {
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
    data: 'actualizarControlador ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.id Controlador a borrar
 * @throws {Error}
 * @return {Promise}
 */
module.exports.borrarControlador = async (options) => {
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
    data: 'borrarControlador ok!'
  };
};

module.exports.buscarControlador = async (options) => {
   let client, db;
   console.log(options.searchString);
   try {
      const MongoClient = require('mongodb').MongoClient;
      const uri = process.env.MONGODB_URI;
      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      db = client.db("urbano1");
      let collection = db.collection('controlador');
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
      data: 'buscarControlador not ok!'
   };
 };
