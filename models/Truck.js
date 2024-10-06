const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    type:{
        type:String,
        enum:['Big','Medium','small'],
        required: true
    },
    model: {
        type: String,
        required: true
    },
    numberplate: {
        type: String,
        required: true
    }
    // Add other relevant fields here
});

module.exports = mongoose.model('Truck', Truck);
