const mongoose = require('mongoose')

const Schema = mongoose.Schema

const underMaintenanceSchema = new Schema({
    maintenance : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    }
})

module.exports = mongoose.model('underMaintenance', underMaintenanceSchema)