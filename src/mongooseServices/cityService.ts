import { City } from '../mongooseSchemas/citySchema'
import {Polygon} from "../types/mongodb/polygon";

export class CityService {
    async getAll() {
        return City.find({}).sort({createdAt: -1});
    }

    async getOne(itemId) {
        return City.findOne({_id: itemId});
    }

    async getOneByField(fieldKey: string, fieldValue) {
        console.log('fieldKey=' + fieldKey);
        return City.findOne({[fieldKey]: fieldValue});
    }

    async create(
        name: string,
        size: string,
        generatedValue: number,
        region: Polygon,
    ) {
        const city = new City({
            region: region,
            size, //'RGB', 'LIDAR', 'ETC'
            name,
            generatedValue,
        });

        try {
            await city.save();
            console.log('city was created');
        } catch (error) {
            console.error('# ' + error);
        }
    }

    async update(itemId, data) {
        const item = await this.getOne(itemId);

        if(!item)
            throw new Error('could not find the requested item');

        Object.keys(data).forEach((key) => {
            item[key] = data[key];
        });
        return item.save();


    }


}
