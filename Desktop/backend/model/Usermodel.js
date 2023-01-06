const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phonenumber:Number
})
module.exports = mongoose.model('Data', dataSchema)