import mongoose = require("mongoose");
import { Polygon } from "./types/mongodb/polygon";
import { CityService } from "./mongooseServices/cityService";

const Schema = mongoose.Schema;

function log(msg) {
    console.log(Date.now()/1000 + ' ' + msg);
}

export class MongoWrapper {
    private cityService = new CityService();
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
        const generatedValue = Math.floor(Math.random() * 1000);

        await this.cityService.create('NY',
            'BIG',
            generatedValue,
            Polygon.generateMongodbPolygon(),
        );

        try {
            const xx = await this.cityService.getOneByField('generatedValue', generatedValue);
            log(xx._id);

            await this.cityService.update(xx._id, {name: "updated!" + generatedValue});
            log('updated....');
        } catch (error) {
            log('# error: ' + error);
            throw error;
        }

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
