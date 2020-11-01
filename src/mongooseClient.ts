import { Polygon } from "./types/mongodb/polygon";
import { CityRepository } from "./mongoose/repositories/cityRepository";
import { CitizenRepository } from "./mongoose/repositories/citizenRepository";
import { MongoWrapper } from "./mongoose/mongooseWrapper";
import { CityDao } from "./mongoose/dao/cityDao";
import { CitizenDao } from "./mongoose/dao/citizenDao";

function log(msg) {
    console.log(Date.now()/1000 + ' ' + msg);
}

export class MongooseClient {
    private static _instance: MongooseClient;
    private cityRepository = new CityRepository();
    private citizenRepository = new CitizenRepository();

    private constructor() {
        MongoWrapper.connectToMongo();
    }

    public static get instance() {
        if( !MongooseClient._instance )
            MongooseClient._instance = new MongooseClient();

        return MongooseClient._instance;
    }

    async run() {
        const generatedValue = Math.floor(Math.random() * 1000);

        const cityDao = new CityDao('NY',
            'BIG',
            generatedValue,
            Polygon.generateMongodbPolygon());
        await this.cityRepository.create( cityDao );

        const citizenDao = new CitizenDao('Ohad redlich',
            generatedValue);
        await this.citizenRepository.create( citizenDao );
        try {
            const xx = await this.cityRepository.getOneByField('generatedValue', generatedValue);
            log(xx._id);

            await this.cityRepository.update(xx._id, {name: "updated!" + generatedValue});
            log('updated....');

            await this.cityRepository.findOneAndUpdate({
                'generatedValue': generatedValue,
            }, {
                'generatedValue': generatedValue + 1,
            });
            log('findOneAndUpdate finished, updated to ' + generatedValue + 1);

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


repo.run();
let repo : MongooseClient = MongooseClient.instance;
