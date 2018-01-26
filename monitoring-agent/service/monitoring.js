const request = require('request');

/**
 * Service responsible for monitoring a target endpoint in a configured interval of time
 */
class MonitoringService {

    /**
     * Creates and instance of Monitoring Service
     *
     * @param String  url the target endpoint to be monitored
     * @param Integer interval in milliseconds
     */
    constructor(url, interval) {
        this.url = url;
        this.interval = interval;
        this.data = []
    }

    /**
     * Start to monitor.
     * 
     * It will request to the endpoint in a configured interval time.  
     *
     * @param Function callback the function to be called when the request is done
     */
    start(callback) {
        var that = this;
        setInterval(() => { that.requestData(callback) }, this.interval);
    }

    /**
     * Request to the target endpoint and call the callback when done.
     * 
     * @param Function callback the callback to be called when the request is done.
     */
    requestData(callback) {
        var that = this;
        request.get({ url: this.url, json: true }, (err, res, body) => {
            if (err) { 
                console.error(err); 
                return callback(err);
            }

            that.data.push(body); // save data, this could be used in the future
            callback(null, body);
        });
    }

    /**
     * Returns the last element of the current data set.
     */
    lastData() {
        return this.data[this.data.length - 1]; // returns the last value
    }
}

module.exports = MonitoringService
