import { Citizen } from "../schemas/citizenSchema";
import { City } from "../schemas/citySchema";
import { BaseRepository } from "./baseRepository";
import { CitizenDao } from "../dao/citizenDao";

export class CitizenRepository extends BaseRepository<CitizenDao> {
    constructor() {
        super(Citizen);
    }
}
