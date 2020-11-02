export class SessionDao {
    constructor(
        public sessionId: string,
        public age: number,
        public supplierName: string,
        public date: Date,
        public metadata: { [key: string]: any },
    ) {}
}
