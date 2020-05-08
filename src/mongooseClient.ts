//import * as mongoose from 'mongoose';
import mongoose = require("mongoose");
// import {}
// const Cat = require('./mongooseSchemas/citySchema');
// const CityService = require('./mongooseServices/cityService');

const Schema = mongoose.Schema;

function log(msg) {
    console.log(Date.now()/1000 + ' ' + msg);
}

export class MongoWrapper {
    constructor() {
    }

    async connectToMongo() {
        log(' ### connecting to mongodb...');
        try {
            await mongoose.connect('mongodb://localhost:27017/test', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                authSource: 'admin',
                serverSelectionTimeoutMS: 30000,
            });

            log(' ### connected to mongodb');

        } catch (error) {
            log( ' ### ' + error);
            throw error;
        }

        mongoose.connection.on('error', err => {
            log('@@error ' + err);
        });

        mongoose.connection.on('connected', () => {
            log('@@connected! ');
        });

        mongoose.connection.on('connecting', () => {
            log('@@connecting... ');
        });

        mongoose.connection.on('disconnected', () => {
            log('@@disconnected :( ');
        });
    }

    async run() {
        await this.connectToMongo();
        //
        // let objId = mongoose.Types.ObjectId();
        // CityService.CityService.create(objId, 'ohads', 8);
        // kitty = new Cat({
        //     sessionId: objId,
        //     name: 'ohads',
        //     region: generateMongodbPolygon() ,
        //     size: 'BIG',
        //     generatedValue: 5});

        // try {
        //     // await kitty.save();
        //     // log('meow');
        //
        //
        //     await Cat.findOneAndUpdate(
        //         { sessionId: objId },
        //         {name: "updated!"}
        //         );
        //     log('updated....');
        // } catch (error) {
        //     log('# error: ' + error);
        //     throw error;
        // }

    }
}


class Coordinate {
    constructor(public long: number, public lat: number) {
    }

    getAsArray() {
        return new Array(this.long, this.lat);
    }
}


let repo : MongoWrapper = new MongoWrapper();
repo.run();
