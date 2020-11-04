import * as mongoose from 'mongoose';
import { MongoWrapper } from "./mongoose/mongooseWrapper";
// Module that estimates the size of an object in memory
const sizeof = require('object-sizeof');

async function testLean() {
    MongoWrapper.connectToMongo();

    const schema = new mongoose.Schema({ name: String });
    const MyModel = mongoose.model('Test', schema);

    await MyModel.create({ name: 'test' });

    const normalDoc = await MyModel.findOne();
    // To enable the `lean` option for a query, use the `lean()` function.
    const leanDoc = await MyModel.findOne().lean();

    console.log( sizeof(normalDoc) ); // >= 1000
    console.log( sizeof(leanDoc) ); // 86, 10x smaller!

    // In case you were wondering, the JSON form of a Mongoose doc is the same
    // as the POJO. This additional memory only affects how much memory your
    // Node.js process uses, not how much data is sent over the network.
    JSON.stringify(normalDoc).length === JSON.stringify(leanDoc).length; // true

    await MongoWrapper.disconnect();
}

testLean();