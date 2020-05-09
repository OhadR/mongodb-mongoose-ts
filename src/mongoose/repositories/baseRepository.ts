import * as mongoose from 'mongoose';

export class BaseRepository<T extends mongoose.Schema> {
    constructor(private schema: T ) {
    }

    async getAll() {
        return this.schema.find({}).sort({createdAt: -1});
    }
}