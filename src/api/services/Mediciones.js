const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.searchString Pasa un acadena de búsqueda opcional para buscar una medición
 * @param {Integer} options.skip Número de registros para omitir la paginación
 * @param {Integer} options.limit Número máximo de registros para devolver
 * @throws {Error}
 * @return {Promise}
 */
module.exports.buscarMediciones = async (options) => {
   let client, db;
   console.log(options.searchString);
   try {
      const MongoClient = require('mongodb').MongoClient;
      const uri = process.env.MONGODB_URI;
      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      db = client.db("urbano1");
      let collection = db.collection('mediciones');
      let result = await collection.find(JSON.parse(options.searchString), {projection:{"id": 1, "Temperatura": 1, "Presion": 1, "Humedad": 1, "Latitud": 1, "Longitud": 1, "fechaMedicion":1}}).toArray();
      console.log(result);
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
      data: 'buscarMediciones not ok!'
   };
};

/**
 * @param {Object} options
 * @param {Object} options.Mediciones Adiciona una medición
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addMediciones = async (options) => {
   let client, db;
   try {
      const MongoClient = require('mongodb').MongoClient;
      const uri = process.env.MONGODB_URI;
      client = await MongoClient.connect(uri, { useNewUrlParser: true });
      db = client.db("urbano1");
      let collection = db.collection('mediciones');
      let result = await collection.insertOne(options.Mediciones);
      let controladorid = options.Mediciones.controlador.id;
      let collectionc = db.collection('controlador');
      let controlador = await collectionc.findOne({"id" : controladorid},{"projection":{"cultivo":1}});
      let collectioncu = db.collection('cultivo');
      let cultivo = await collectioncu.findOne({"id" : controlador.cultivo},{"projection":{"pHumedad":1}});
      console.log(cultivo.pHumedad);
      let riego = "0";
      if(parseFloat(cultivo.pHumedad) > parseFloat(options.Mediciones.Humedad)){
       riego = "1";  
      }
      return {
         status: 200,
         data: riego+'addMediciones ok!'
      };
   } catch (e) {
      console.error(e);
   } finally {
      client.close();
   }

   return {
      status: 500,
      data: 'addMediciones not ok!'
   };
};