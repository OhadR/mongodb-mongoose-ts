import * as mongoose from 'mongoose';
//import mongoose = require("mongoose");

const polygonObject = {
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers
        required: true
    }
};

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        // unique: true,
        required: true,
    },
    size: {
        type: String,
        enum: [
            'BIG',
            'SMALL',
        ],
    },
    generatedValue: Number,
    region: polygonObject,
},
{
    timestamps: true,
    versionKey: false,  //disable the __v, https://mongoosejs.com/docs/guide.html#versionKey
});

citySchema.index({ region: '2dsphere' });

export const City = mongoose.model('City', citySchema);
