'use strict';
//const validate = require('./validation');
const { mongoClient } = require('./mongo');

//Mongo Trigger 
module.exports.processOrder = async (event) => {
  console.log('Entered Lambda', event);
  const db = await mongoClient();

  for (const { body } of (event && event.Records)) {
    console.log('body :>> ', body);
    if (!db) res.status(500).send('Mongo DB Unavailable');

    try {
      const data = JSON.parse(body);
      // SNS events will contain "Message" field, otherwise message be in event.body
      const message = JSON.parse(data.Message || body);
      console.log('message :>> ', message);

      await db.collection('cloudComputing').insertOne(message);
      console.log("Data is inserted in DB!!!!"); 
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }; 

} catch (e) {
  console.log('[processOrder Error] error:', JSON.stringify(e));
  console.log('[processOrder Error] event:', JSON.stringify(event));
  throw e;
}
}
}; 

