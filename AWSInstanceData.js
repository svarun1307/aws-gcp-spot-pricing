var mongoose =require('mongoose');

var AWSInstanceData = mongoose.model('AWSInstanceData',new mongoose.Schema({
    "Instance type" : {
        type : String
    },
    "Instance family" : {
        type : String
    },
     "Availability zones" :{
        type : String
    },
    "Cores":{
        type:String
    },
    "Valid cores":{
        type:String
    },
    "Threads per core":{
        type:String
    },
    "Sustained clock speed (GHz)":{
        type:String
    },
    "Memory (MiB)":{
        type:String
    },
    "Storage (GB)":{
        type:String
    }
}));

//module.exports = {AWSInstanceData};
module.exports = AWSInstanceData;