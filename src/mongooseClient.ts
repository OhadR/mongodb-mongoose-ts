import { Polygon } from "./types/mongodb/polygon";
import { CityService } from "./mongoose/repositories/cityService";
import { CitizenRepository } from "./mongoose/repositories/citizenRepository";
import { MongoWrapper } from "./mongoose/mongooseWrapper";

function log(msg) {
    console.log(Date.now()/1000 + ' ' + msg);
}

export class MongooseClient {
    private cityService = new CityService();
    private citizenRepository = new CitizenRepository();
    constructor() {
        MongoWrapper.connectToMongo();
    }

    async run() {
        const generatedValue = Math.floor(Math.random() * 1000);

        await this.cityService.create('NY',
            'BIG',
            generatedValue,
            Polygon.generateMongodbPolygon(),
        );

        await this.citizenRepository.create('Ohad redlich',
            999908,
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


let repo : MongooseClient = new MongooseClient();
repo.run();
