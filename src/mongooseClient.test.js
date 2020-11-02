const Cat = require('./mongoose/schemas/citySchema');




test('Missing Required Field', () => {
/*
    const cesiumWrapper = new CesiumWrapper();
    const pathsMap = new Map();
    pathsMap.set('C:\\Ohads\\Dev\\SampleData\\House.XXX', pathTypes.mosheee);
    expect(cesiumWrapper.invokeCesium(pathsMap)).toBe('Error: No Tiler was Registered for Model');
*/

    const kittyNoName = new Cat({ region: generateMongodbPolygon() , size: 'BIG', generatedValue: 5});
//error: 'ValidationError: Cat validation failed: name: Path `name` is required.'
    kittyNoName.save().then(() => console.log('meow'))
        .catch((err) => {
            console.error(err.errors['name'].message);
            assert.equal(err.errors['name'].message, 'Path `name` is required.');
        });});


test('Duplicate Key Error', () => {
}