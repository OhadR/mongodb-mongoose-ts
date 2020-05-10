import * as mongoose from 'mongoose';
import { BaseDao } from "../dao/baseDao";

export class BaseRepository<T extends BaseDao> {
    constructor(private schema: mongoose.Schema ) {
    }

    async getAll() {
        return this.schema.find({}).sort({createdAt: -1});
    }


    async getOne(itemId) {
        return this.schema.findOne({_id: itemId});
    }

    async getOneByField(fieldKey: string, fieldValue) {
        console.log('fieldKey=' + fieldKey);
        return this.schema.findOne({[fieldKey]: fieldValue});
    }

    async create(dao: T) {
        const city = new this.schema( dao );

        try {
            return await city.save();
            console.log(dao._schema + ' was created');
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

    async findOneAndUpdate(condition, data) {
        return await this.schema.findOneAndUpdate(condition, data);
    }
}