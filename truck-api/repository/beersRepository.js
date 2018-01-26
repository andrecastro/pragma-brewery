const uuidv4 = require('uuid/v4');

/**
 * Mocked array of beers, with the respective beer and type.
 */
const beers = [
    {
        id: uuidv4(),
        name: "Beer 1",
        type: "Pilsen",
        minTemperature: -4,
        maxTemperature: 6
    },
    {
        id: uuidv4(),
        name: "Beer 2",
        type: "IPA",
        minTemperature: -5,
        maxTemperature: 6
    },
    {
        id: uuidv4(),
        name: "Beer 3",
        type: "Lager",
        minTemperature: -4,
        maxTemperature: 7
    },
    {
        id: uuidv4(),
        name: "Beer 4",
        type: "Stout",
        minTemperature: -6,
        maxTemperature: 8
    },
    {
        id: uuidv4(),
        name: "Beer 5",
        type: "Wheat beer",
        minTemperature: -3,
        maxTemperature: 5
    },
    {
        id: uuidv4(),
        name: "Beer 6",
        type: "Pale Ale",
        minTemperature: -4,
        maxTemperature: 6
    }
]

module.exports = {
    /**
     * List all beers.
     */
    all: () => {
        return beers;
    },

    /**
     * Filter the beer by the field id.
     */
    findById: (id) => {
        return beers.filter((data)=> { return data.id == id })[0];
    },

    /**
     * Get the beer by the index of the array.
     */
    get: (index) => {
        return beers[index];
    }
}
