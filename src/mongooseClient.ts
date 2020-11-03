import { Polygon } from "./types/mongodb/polygon";
import { CityRepository } from "./mongoose/repositories/cityRepository";
import { CitizenRepository } from "./mongoose/repositories/citizenRepository";
import { MongoWrapper } from "./mongoose/mongooseWrapper";
import { CityDao } from "./mongoose/dao/cityDao";
import { CitizenDao } from "./mongoose/dao/citizenDao";
import { SessionDao } from "./mongoose/dao/sessionDao";
import { SessionModel } from "./mongoose/schemas/session-schema"
import { v4 as uuidv4 } from 'uuid';
import { FilterRequest, GetSessionsRequest, Order, PagingRequest, SortRequest } from "./types/filterRequest";
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
            Math.floor(Math.random() * 100),        //age
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

    buildQuery(request: GetSessionsRequest): mongoose.Query<any> {
        if(!request)
            return null;

        let query: mongoose.Query = SessionModel.find();
        if(request.filter.fromDate)
            query = query.where('date').gt(new Date(request.filter.fromDate).toISOString());

        if(request.filter.toDate)
            query = query.where('date').lt(new Date(request.filter.toDate).toISOString());

        if(request.filter.supplierName)
            query = query.where('supplierName').equals(request.filter.supplierName);

        if(request.filter.fromAge)
            query = query.where('age').gt(request.filter.fromAge);

        if(request.filter.toAge)
            query = query.where('age').lt(request.filter.toAge);


        if(request.sort)
            query = query.sort(request.sort);

        if(request.paging)
            query
                .limit(request.paging.pageSize)
                .skip(request.paging.pageSize * request.paging.pageNumber);

        return query;
    }


    async sessionGames() {
// create dataset of N sessions (do it only once...):
//        await this.generateSessions(100);

/*
        let r = SessionModel;
        r = r.where('age').gte(40).lte(45);
        r = r.where('date').lt(new Date(2020, 2,0).toISOString());

        r= await r.exec();
        log('@@@ ' + r);
*/

        const filter: FilterRequest = {
            region: Polygon.generateMongodbPolygon(),
            supplierName: "ohads",
//            toDate: new Date8(2020, 9,0),
            fromAge: 40,
            toAge: 60,
        };

        const sort: SortRequest = {
            age: Order.descending,
        };

        const paging: PagingRequest = {
            pageNumber: 4,
            pageSize: 3
        };

        const request: GetSessionsRequest = {
            filter,
            paging,
            sort
        };


        let query: mongoose.Query<any> = this.buildQuery(request);

        const result = await query.exec();
        log('@@@ ' + result);

        await MongoWrapper.disconnect();
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
