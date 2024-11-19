import mongoose from "mongoose";
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