const request = require('request');
//require('dotenv').load();
const dotenv = require('dotenv');
dotenv.config();

let serviceDetails =     {
    "name": "services/6F81-5844-456A",
    "serviceId": "6F81-5844-456A",
    "displayName": "Compute Engine",
    "businessEntityName": "businessEntities/GCP"
  }

//console.log(`https://cloudbilling.googleapis.com/v1/services/${serviceDetails.serviceId}/skus?key=${process.env.GCP_API_KEY}`);

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
        console.log(JSON.stringify(filteredValues));
        
    };
});