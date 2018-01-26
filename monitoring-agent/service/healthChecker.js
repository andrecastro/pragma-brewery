/**
 * Service responsible for check if the containers are healthy.
 */
class HealthChecker {

    /**
     * Check if the each container of the array is healthy and mark them.
     * 
     * It will return a new array with the containers marked.
     * 
     * @param Array containers 
     */
    check(containers) {
        var checkedContainers = [];
        
        for(var index in containers) {
            var container = containers[index];
            container.isHealthy = this.isHealthy(container);
            checkedContainers.push(container);
        }
        
        return checkedContainers;
    }

    /**
     * Check if the container temperature is between the max and min allowed.
     *
     * @param JSON container 
     */
    isHealthy(container) {
        return container.beer.minTemperature <= container.currentTemperature && 
        container.currentTemperature <= container.beer.maxTemperature;
    }
}

module.exports = HealthChecker
