import * as mongoose from 'mongoose';

const citizenSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        ssid: {
            type: Number,
            index: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,  //disable the __v, https://mongoosejs.com/docs/guide.html#versionKey
    });

export const Citizen = mongoose.model('Citizen', citizenSchema);