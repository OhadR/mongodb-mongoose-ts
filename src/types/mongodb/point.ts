
export class Point {
    protected type: string;
    protected coordinates: Array<number>;
    constructor(coordinates: Array<number>) {
        this.type = 'Point';
        //validations:
        Point.validatePoint(coordinates);

        this.coordinates = coordinates;
    }

    static validatePoint(coordinates: Array<number>) {
        if (coordinates === undefined) {
            throw new Error(
                'Illegal Argument: coordinates is undefined',
            );
        }

        if (coordinates.length != 2) {
            throw new Error(
                'Illegal Argument: coordinates must consist of {longitude, latitude}',
            );
        }

        if (coordinates[0] > 180 || coordinates[0] < -180)
            throw new Error(
                'Illegal Argument: longitude must be in range -180:180',
            );

        if (coordinates[1] > 90 || coordinates[1] < -90)
            throw new Error(
                'Illegal Argument: latitude must be in range -90:90',
            );
    }
}
