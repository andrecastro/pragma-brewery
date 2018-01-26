const uuidv4 = require('uuid/v4');
const beerRepository = require('./beersRepository');

/**
 * Generates a random value between the max and min, both included.
 * 
 * @param {*} min 
 * @param {*} max 
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Mock an array of containers and return it.
 *
 * @param {*} quantity 
 */
function mockContaineresData(quantity) {
    var containers = []
    var beers = beerRepository.all();

    for (var index = 0; index < quantity; index++) {
        var currentBeear = beers[index % beers.length]; // circular iteration
        var temperature = random(currentBeear.minTemperature, 0); // random between min and 0°C

        containers.push({
            id: uuidv4(),
            configuredTemperature: temperature,
            currentTemperature: temperature,
            beer: currentBeear
        })
    }

    return containers;
}

/**
 * The mocked array of containers. This could be replaced by a database or something like that.
 */
var containers = mockContaineresData(6); // mock 6 containers to initialize

module.exports = {
    
    /**
     * List all containers.
     */
    all: () => {
        return containers;
    },

    /**
     * Creates a container and add it to the mocked array.
     */
    create: (data) => {
        var container = {};
        container.id = uuidv4();
        container.currentTemperature = data.currentTemperature;
        container.configuredTemperature = data.configuredTemperature;
        container.beer = beerRepository.findById(data.beer.id);

        containers.push(container);
        return container;
    },

    /**
     * Filter the container by the field id.
     */
    findById: (id) => {
        return containers.filter((data)=> { return data.id == id })[0];
    },

    /**
     * Remove the container by the field id.
     */
    remove: (id) => {
        var index = containers.findIndex((element) => { return element.id == id });
        
        if (index > -1) {
            containers.splice(index, 1);
        }
    },
    
    /**
     * Updates the container.
     */
    update: (id, data) => {
        var index = containers.findIndex((element) => { return element.id == id });
        
        if (index > -1) {
            containers[index] = {
                id: id,
                currentTemperature: data.currentTemperature,
                configuredTemperature: data.configuredTemperature,
                beer: beerRepository.findById(data.beer.id)
            }
            return containers[index];
        }
        return null;
    }
}

