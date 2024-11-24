const mongoose = require('mongoose');
const {Schema} = mongoose;

const alarmSchema = new Schema({
    time:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
});

const alarmModel = mongoose.model("alarms", alarmSchema);

module.exports = alarmModel;