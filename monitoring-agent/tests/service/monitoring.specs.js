const MonitoringService = require('../../service/monitoring.js');
const request = require('request');
const sinon = require('sinon');
const expect = require('chai').use(require('chai-string')).expect;

describe('MonitoringService', () => {

    describe('#constructor', () => {
        it('should construct with target url', () => {
            var targetUrl = 'http://mytest.url';
            var monitoring = new MonitoringService(targetUrl);
            expect(monitoring.url).to.equal(targetUrl);
        })

        it('should construct with target interval', () => {
            var targetUrl = 'http://mytest.url';
            var interval = 5000;
            var monitoring = new MonitoringService(targetUrl, interval);
            expect(monitoring.interval).to.equal(interval);
        })

        it('should construct with empty data', () => {
            var targetUrl = 'http://mytest.url';
            var interval = 5000;
            var monitoring = new MonitoringService(targetUrl, interval);
            expect(monitoring.data).to.be.an('array').that.is.empty;
        })
    })

    describe('#requestData', () => {
        afterEach(function () {
            request.get.restore();
        });

        it('should call the callback with error when request error', (done) => {
            var myError = 'my error';
            var callback = (error) => {
                expect(error).to.equal(myError);
                done()
            };

            sinon
                .stub(request, 'get')
                .yields(myError, null, null);

            var monitoring = new MonitoringService('http://mytest.url', 1000);
            monitoring.requestData(callback)
        })

        it('should call the callback with data when success', (done) => {
            var myData = { data: "value" };
            var callback = (error, data) => {
                expect(error).to.be.null
                expect(data).to.be.equal(myData)
                done();
            };

            sinon
                .stub(request, 'get')
                .yields(null, null, myData);

            var monitoring = new MonitoringService('http://mytest.url', 1000);
            monitoring.requestData(callback)
        })
    })
})
