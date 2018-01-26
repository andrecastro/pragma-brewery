const beersRepository = require('../repository/beersRepository');

module.exports = {

    /**
     * List all beers as JSON.
     */
    index: (request, response) => {
        response.json(beersRepository.all());
    }
}
