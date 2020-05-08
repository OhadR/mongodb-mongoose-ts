import { Point } from './point';
import {Coordinate} from "../coordinate";

export class Polygon {
    protected type: string;
    protected coordinates: Array<Array<Array<number>>>
    constructor(coordinates: Array<Array<Array<number>>>) {
        this.type = 'Polygon';
        //validations:
        Polygon.validatePolygon(coordinates);

        this.coordinates = coordinates;
    }

    static validatePolygon(coordinates: Array<Array<Array<number>>>) {
        if (coordinates === undefined) {
            throw new Error('Illegal Argument: coordinates is undefined');
        }

        if (coordinates.length != 1) {
            throw new Error('Illegal Argument: coordinates[0] is undefined or >1');
        }

        //Polygon must have at least 3 points + closing point, which means 4
        if (coordinates[0].length < 4) {
            throw new Error('Illegal Argument: Polygon must have at least 4 points');
        }

        coordinates[0].forEach(longLat => {
            //validate each point, using Point validations:
            new Point(longLat);
        });
    }

    /**
     *
     * @returns {Location} object which is in format of mongodb's Polygon
     */
    static generateMongodbPolygon() {
        const longitude = Math.floor(Math.random() * 350) - 180; //mul by 350 bcoz i want range of -180:170 so when i add 10 i do not get out of range
        const latitude = Math.floor(Math.random() * 170) - 90; //mul by 170 bcoz i want range of -90:80 so when i add 10 i do not get out of range
        const coordinates: number[][] = [];

        //generate the points in the polygon:
        const coordinate1 = new Coordinate(longitude, latitude);
        coordinates.push(coordinate1.getAsArray());
        const coordinate2 = new Coordinate(longitude + 10, latitude);
        coordinates.push(coordinate2.getAsArray());
        const coordinate3 = new Coordinate(longitude + 10, latitude + 10);
        coordinates.push(coordinate3.getAsArray());
        const coordinate4 = new Coordinate(longitude, latitude + 10);
        coordinates.push(coordinate4.getAsArray());
        coordinates.push(coordinate1.getAsArray()); //to close the polygon

        const loc = new Polygon(new Array(coordinates)); //to fit mongo's structure, coordinates is array of arrays of coordinates (see below)
        //console.log(loc);

        return loc;
    }
}
