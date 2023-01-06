const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    userid:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    name: {
        required:true,
        type:String
    },
    date: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Album', albumSchema)