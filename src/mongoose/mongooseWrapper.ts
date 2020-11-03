import mongoose = require("mongoose");

function log(msg) {
    console.log(Date.now()/1000 + ' ' + msg);
}

export class MongoWrapper {
    constructor() {
    }

    static async connectToMongo() {
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

    static async disconnect() {
        log('disconnecting to mongodb...');
        await mongoose.disconnect();
    }
}