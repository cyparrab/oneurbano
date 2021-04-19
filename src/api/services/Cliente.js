const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.searchString Pasa un acadena de búsqueda opcional para buscar un cliente
 * @param {Integer} options.skip Número de registros para omitir la paginación
 * @param {Integer} options.limit Número máximo de registros para devolver
 * @throws {Error}
 * @return {Promise}
 */
module.exports.buscarCliente = async (options) => {
  let client, db;
  console.log(options.searchString);
  try {
     const MongoClient = require('mongodb').MongoClient;
     const uri = process.env.MONGODB_URI;
     client = await MongoClient.connect(uri, { useNewUrlParser: true });
     db = client.db("urbano1");
     let collection = db.collection('cliente');
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
     data: 'buscarCliente not ok!'
  };
};

/**
 * @param {Object} options
 * @param {Object} options.Cliente Adiciona un cliente
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addCliente = async (options) => {
  let client, db;
   try {
      const crypto = require('crypto')
      console.log(options);
      options.Cliente.contrasena = crypto.createHash('md5').update(options.Cliente.contrasena).digest("hex")
      
      const MongoClient = require('mongodb').MongoClient;
      const uri = process.env.MONGODB_URI;

      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      db = client.db("urbano1");
      let collection = db.collection('cliente');
      let result = await collection.findOneAndDelete({usuario:options.usuario});
      /*if(result != null){
         return {
            status: 500,
            data: 'addCliente not ok!'
         };   
      }*/
      result = await collection.insertOne(options.Cliente);
      return {
         status: 200,
         data: 'addCliente ok!'
      };
   } catch (e) {
      console.error(e);
   } finally {
      client.close();
   }

   return {
      status: 500,
      data: 'addCliente not ok!'
   };
};

/**
 * @param {Object} options
 * @param {String} options.usuario Usuario a actualizar
 * @param {Object} options.body Objeto de ususario actualizado
 * @throws {Error}
 * @return {Promise}
 */
module.exports.actualizarCliente = async (options) => {
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
    data: 'actualizarCliente ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.usuario Usuario a borrar
 * @throws {Error}
 * @return {Promise}
 */
module.exports.borrarCliente = async (options) => {
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
    data: 'borrarCliente ok!'
  };
};

module.exports.autenticarCliente = async (options) => {
   let client, db;
   try {
      const crypto = require('crypto')
      options.contrasena = crypto.createHash('md5').update(options.contrasena).digest("hex")
      console.log(options.contrasena);
      const MongoClient = require('mongodb').MongoClient;
      const uri = process.env.MONGODB_URI;

      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      db = client.db("urbano1");
      let collection = db.collection('cliente');
      let result = await collection.findOne({"usuario":options.usuario});
      console.log(result);
      if(result == null || result.contrasena != options.contrasena){
         return {
            status: 500,
            data: 'AutenticarCliente not ok!'
         };
      }

      return {
         status: 200,
         data: 'AutenticarCliente ok!'
      };
   } catch (e) {
      console.error(e);
   } finally {
      client.close();
   }
   return {
      status: 500,
      data: 'AutenticarCliente not ok!'
   };
   
};