const mongoose = require('mongoose');
const departmentSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    airportType: String,
    departmentName: String,
    serviceType: String,
    skill: String

});

module.exports = mongoose.model('Department' , departmentSchema );