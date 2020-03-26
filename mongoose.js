var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://root:root@cluster0-fqhyo.mongodb.net/VMResource?retryWrites=true&w=majority");

module.exports = {mongoose};