const containersRepository = require('../repository/containersRepository');

module.exports = {
    /**
     * List all containers
     */
    index: (request, response) => {
        response.json(containersRepository.all());
    },

    /**
     * Creates a given container
     */
    create: (request, response) => {
        var container = containersRepository.create(request.body);
        response.status(201).json(container);
    },

    /**
     * Deletes a container by the id
     */
    delete: (request, response) => {
        var id = request.params.id;
        containersRepository.remove(id);
        response.sendStatus(202);
    },

    /**
     * Updates a given container
     */
    update: (request, response) => {
        var id = request.params.id;
        var container = containersRepository.update(id, request.body);
        response.status(200).json(container);
    }
}