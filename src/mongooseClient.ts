var assert = require('assert');
const mongoose = require('mongoose');
const Cat = require('./mongooseSchemas/citySchema');
const CityService = require('./mongooseServices/cityService');

const Schema = mongoose.Schema;

function log(msg) {
    console.log(Date.now()/1000 + ' ' + msg);
}

async function connectToMongo() {
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
        error( ' ### ' + error);
        throw error;
    }
}

mongoose.connection.on('error', err => {
    error('@@error ' + err);
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

class Coordinate {
    constructor(long, lat) {

        this.long = long;
        this.lat = lat;
    }

    getAsArray() {
        return new Array(this.long, this.lat);
    }
}


//see below an example of how Polygon object looks like in mongodb
class Polygon {
    constructor(coordinates) {

        this.coordinates = coordinates;
        this.type = 'Polygon';
    }
}

/**
 *
 * @returns {Polygon} object which is in format of mongodb's Polygon
 */
function generateMongodbPolygon() {

    const longitude = Math.floor(Math.random() * 350 ) - 180;   //mul by 350 bcoz i want range of -180:170 so when i add 10 i do not get out of range
    const latitude = Math.floor(Math.random() * 170 ) - 90;     //mul by 170 bcoz i want range of -90:80 so when i add 10 i do not get out of range
    var coordinates = new Array();

    //generate the points in the polygon:
    const coordinate1 = new Coordinate(longitude, latitude);
    coordinates.push(coordinate1.getAsArray());
    const coordinate2 = new Coordinate(longitude + 10, latitude);
    coordinates.push(coordinate2.getAsArray());
    const coordinate3 = new Coordinate(longitude + 10, latitude + 10);
    coordinates.push(coordinate3.getAsArray());
    const coordinate4 = new Coordinate(longitude, latitude + 10);
    coordinates.push(coordinate4.getAsArray());
    coordinates.push(coordinate1.getAsArray()); //to close the polygon

    const loc = new Polygon(new Array(coordinates));   //to fit mongo's structure, coordinates is array of arrays of coordinates (see below)
    //log(loc);

    return loc;
}

async function run() {
    await connectToMongo();

    let objId = mongoose.Types.ObjectId();
    CityService.CityService.create(objId, 'ohads', 8);
    // kitty = new Cat({
    //     sessionId: objId,
    //     name: 'ohads',
    //     region: generateMongodbPolygon() ,
    //     size: 'BIG',
    //     generatedValue: 5});

    try {
        // await kitty.save();
        // log('meow');


        await Cat.findOneAndUpdate(
            { sessionId: objId },
            {name: "updated!"}
            );
        log('updated....');
    } catch (error) {
        log('# error: ' + error);
        throw error;
    }

}

run();
