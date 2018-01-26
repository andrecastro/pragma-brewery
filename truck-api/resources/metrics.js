const containersRepository = require('../repository/containersRepository');

module.exports = {
    "index": (request, response) => {
        response.json({ 
            containers: containersRepository.all()
        })
    }
}