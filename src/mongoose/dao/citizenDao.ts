import { BaseDao } from "./baseDao";

export class CitizenDao extends  BaseDao {
    constructor(public name: string,
                public ssid: number,) {
        super('Ciziten');
    }
}