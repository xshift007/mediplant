const Typesense = require('typesense');

module.exports = (async () => {
  const typesense = new Typesense.Client({
    nodes: [
      {
        host: '127.0.0.1',
        port: '8108',
        protocol: 'http',
      },
    ],
    apiKey: 'xyz',
  });

  const schema = {
    name: 'plantas_medicinales',
    fields: [
      { "name": "title", "type": "string" },
      { "name": "common_name", "type": "string", "facet": true },
      { "name": "scientific_name", "type": "string" },
      { "name": "plant_parts", "type": "string", "facet": true },
      { "name": "traditional_use", "type": "string" },
      { "name": "posology", "type": "string" },
      { "name": "contraindications", "type": "string" },
      { "name": "interactions", "type": "string" },
      { "name": "sale_condition", "type": "string", "facet": true },
      { "name": "references", "type": "string" },
      { "name": "herbal_preparations", "type": "string" },
      { "name": "image_url", "type": "string" }
    ]
  };
  console.log('Realizando la indexación en Typesense');

  try {
    await typesense.collections('plantas_medicinales').delete();
    console.log('Eliminando colección anterior.');
  } catch (error) {
    // Do nothing
  }

  console.log('Creando el esquema: ');
  console.log(JSON.stringify(schema, null, 2));
  await typesense.collections().create(schema);

  console.log('Agregando las plantas : ');
  const plantas_medicinales = require('../public/data/plantas_medicinales.json');

  try {
    const returnData = await typesense
      .collections('plantas_medicinales')
      .documents()
      .import(plantas_medicinales);
    console.log(returnData);
    console.log('Plantas indexadas correctamente.');

    const failedItems = returnData.filter(item => item.success === false);
    if (failedItems.length > 0) {
      throw new Error(
        `Error al indexar los items ${JSON.stringify(failedItems, null, 2)}`
      );
    }

    return returnData;
  } catch (error) {
    console.log(error);
  }
})();
