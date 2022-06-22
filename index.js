// Load Environment Variables
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const bodyparser= require('body-parser');
app.use(bodyparser.json()); 

// Parse request body in middleware before handlers
const port = 4000;
console.log(`App is listening on port ${port}`);
app.listen(port);

// Configure the region 
AWS.config.update({region: 'us-east-1'});
// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const sns = new AWS.SNS();


// Subscribe
app.post('/subscribe', (req, res) => { 
  let params = { 
      Protocol: 'SQS',  
      TopicArn: 'arn:aws:sns:us-east-1:265700068377:project', 
      Endpoint: 'arn:aws:sqs:us-east-1:265700068377:MyFirstQueue'
  }; 
  
  sns.subscribe(params, (err, data) => { 
      if (err) { 
          console.log(err); 
      } else {
        console.log(data); 
          res.send(data); 
      } 
  }); 
});


// Publish
app.post('/publish', (req, res) => { 
  console.log("entered here");
  console.log(req.body);
  let params = { 
      Message: JSON.stringify(req.body.message), 
      TopicArn: 'arn:aws:sns:us-east-1:265700068377:project', 
      MessageGroupId: "UserMessages" 
  }; 
  sns.publish(params, function(err, data) { 
      if (err) console.log(err, err.stack);  
      else console.log(data); 
  }); 
});


// Publish Email
app.post('/publishEmail', (req, res) => {
    let params = {
        Protocol: 'EMAIL', 
        TopicArn: 'arn:aws:sns:us-east-1:265700068377:project',
        Endpoint: 'layanelsaeed2010@gmail.com'
    };
    sns.subscribe(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.send(data);
        }
    });
});