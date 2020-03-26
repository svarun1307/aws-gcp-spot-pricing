var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');

var AWSInstanceData = require('./AWSInstanceData');
//var {mongoose} = require('./mongoose');
const mongoose = require('mongoose');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use(bodyParser.json());

//Connecting to MongoDB

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root@cluster0-fqhyo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
let collection;
client.connect(err => {
  collection = client.db("VMResource").collection("AWSInstanceData");
  //console.log(collection);
});

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide//ec2-example-creating-an-instance.html

// snippet-start:[ec2.JavaScript.Instances.create_instances]
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.update({region: 'us-west-2'});

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});



/****************Basic Instance Working Till Here****************/
var params = {
  AvailabilityZone: 'us-west-2a',
  DryRun: false,
  EndTime: new Date(),
  InstanceTypes: [
    "t1.micro", "t2.nano"
    /* more items */
  ],
  MaxResults: 5,
  StartTime: new Date()
};




//GET PRICING FROM AWS
app.get('/getAWSEC2PriceHistory',  function (req, res) {
  console.log("inide get req")
  ec2.describeSpotPriceHistory(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else    res.send(data);           // successful response
  });


});

//GET PRICING FROM GCP
app.get("/gcpPriceHistory",function(req,res1){
  const request = require('request');
  const dotenv = require('dotenv');
  dotenv.config();
  
  let serviceDetails =     {
      "name": "services/6F81-5844-456A",
      "serviceId": "6F81-5844-456A",
      "displayName": "Compute Engine",
      "businessEntityName": "businessEntities/GCP"
    }
  
  
  request(`https://cloudbilling.googleapis.com/v1/services/${serviceDetails.serviceId}/skus?key=${process.env.GCP_API_KEY}`, { json: true }, (err, res, body) => {
    if (err) { 
        return console.log(err); 
      }
  
      if(body["skus"]){
  
          let totalEntries = body["skus"];
          let filteredValues = totalEntries.filter(function(a){
              return a["category"]["usageType"] === "Preemptible";
          });
  
          filteredValues.sort(function(a, b) { return a.pricingInfo["0"]["pricingExpression"]["tieredRates"]["0"]["unitPrice"]["nanos"] - b.pricingInfo["0"]["pricingExpression"]["tieredRates"]["0"]["unitPrice"]["nanos"]; });
          //console.log(JSON.stringify(filteredValues));
          res1.send(filteredValues);
      };
  });

});

app.listen(3001);
    console.log("Server Listening on port 3001");