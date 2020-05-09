import { Polygon } from "../../types/mongodb/polygon";
import { BaseDao } from "./baseDao";

export class CityDao extends BaseDao {
    constructor(public name: string,
                public size: string,
                public generatedValue: number,
                public region: Polygon,
                ) {
        super('City');
    }
}