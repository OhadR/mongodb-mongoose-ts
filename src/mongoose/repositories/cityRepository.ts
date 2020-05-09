import { BaseRepository } from "./baseRepository";
import { City } from "../schemas/citySchema";
import { CityDao } from "../dao/cityDao";

export class CityRepository extends BaseRepository<CityDao> {
    constructor() {
        super(City);
    }
}
