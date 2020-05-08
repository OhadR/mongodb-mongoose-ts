export class Coordinate {
    long: number;
    lat: number;
    constructor(long: number, lat: number) {

        this.long = long;
        this.lat = lat;
    }

    getAsArray(): Array<number> {
        return new Array(this.long, this.lat);
    }
}
