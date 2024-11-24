const mongoose = require('mongoose');
const {Schema} = mongoose;

const settingsSchema = new Schema({
    isActivated:{
        type: Boolean,
        required: true
    },
    userKey:{
        type: String,
        required: true
    },
});
const settingsModel = mongoose.model("settings", settingsSchema);

module.exports = settingsModel;