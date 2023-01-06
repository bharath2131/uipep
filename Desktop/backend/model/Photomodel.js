const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    albumid: {
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    userid:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    name:{
        required:true,
        type:String
    },
    ImageUrl: String,
    date: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Photo', photoSchema)