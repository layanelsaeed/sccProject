'use strict';

const AWS= require('aws-sdk'); 
AWS.config.update({region: 'us-east-1'}); 
const SNS = new AWS.SNS({apiVersion: '2010-03-31'}); 


module.exports.hello = async (event) => {
  const params = {
    Message: event.body, 
    TopicArn: 'arn:aws:sns:us-east-1:265700068377:project'
  };

  await SNS.publish(params).promise(); 

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'SCC API Gateway is successfully created!',
        input: event,
      }),
  };
};





