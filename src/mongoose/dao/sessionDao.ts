export class SessionDao {
    constructor(
        public sessionId: string,
        public metadata: { [key: string]: any },
    ) {}
}
