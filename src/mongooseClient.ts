import { Polygon } from "./types/mongodb/polygon";
import { CityRepository } from "./mongoose/repositories/cityRepository";
import { CitizenRepository } from "./mongoose/repositories/citizenRepository";
import { MongoWrapper } from "./mongoose/mongooseWrapper";
import { CityDao } from "./mongoose/dao/cityDao";
import { CitizenDao } from "./mongoose/dao/citizenDao";
import { SessionDao } from "./mongoose/dao/sessionDao";
import { SessionModel } from "./mongoose/schemas/session-schema"
import { v4 as uuidv4 } from 'uuid';
import { FilterRequest } from "./types/filterRequest";
import * as mongoose from 'mongoose';

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

    async generateSession() {
        const sessionDao = new SessionDao(uuidv4(),
            Math.floor(Math.random() * 100),
            'ohads',
            new Date(2020, Math.random() * 12, Math.random() * 30),
            {
                a: 'BIG',
                b: 'b',
                region: Polygon.generateMongodbPolygon()
            });
        const session = new SessionModel(sessionDao);
        await session.save();
        log('session was saved');
    }

    async generateSessions(n: number) {
        for(let i = 0; i < n; ++i)
            await this.generateSession();
    }

    async buildQuery(filter: FilterRequest): Promise<mongoose.Query<any>> {
        let query = SessionModel;
        // if(filter.fromDate)
        //     query = query.where('createdAt').gt(new Date(filter.fromDate).toISOString());
        //
        // if(filter.toDate)
        //     query = query.where('createdAt').lt(new Date(filter.toDate).toISOString());

        if(filter.supplierName)
            query = query.where('supplierName').equals(filter.supplierName);

        query = query.where('sessionId').equals('9bef7941-8e8e-46e4-9a02-cf597e790e26');


        return query;
    }


    async sessionGames() {
// create dataset of N sessions (do it only once...):
//        await this.generateSessions(100);

        // instead of writing:
        //const r = await SessionModel.find({age: {$gte: 21, $lte: 65}});

        //write this:
        let r = await SessionModel.where('age').gte(21).lte(65);
        log(r);

        r = await SessionModel.where('createdAt').lt(new Date().toISOString());
        log('lt date: ' + r);

        const filter: FilterRequest = {
            country: 'israel',
            region: Polygon.generateMongodbPolygon(),
            supplierName: "ohads",
//            toDate: new Date(),
        };
        const query: mongoose.Query<any> = await this.buildQuery(filter);
        log('lt date: ' + query);

    }
}

class Coordinate {
    constructor(public long: number, public lat: number) {
    }

    getAsArray() {
        return new Array(this.long, this.lat);
    }
}


let repo : MongooseClient = MongooseClient.instance;
//repo.run();
repo.sessionGames();
