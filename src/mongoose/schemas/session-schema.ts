import * as mongoose from 'mongoose';
import { SessionDao } from '../dao/sessionDao';

const sessionSchema = new mongoose.Schema(
    {
        version: Number,
        sessionId: {
            type: String,
            index: true,
            unique: true,
            required: true,
        },
        metadata: Object,
    },
    {
        autoCreate: true,
        timestamps: true,
        versionKey: false, //to disable the __v
    },
);

export interface SessionDocument extends SessionDao, mongoose.Document {}

export const SessionModel = mongoose.model<SessionDocument>(
    'Session',
    sessionSchema,
);
