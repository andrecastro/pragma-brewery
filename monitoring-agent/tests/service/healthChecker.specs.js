const expect = require('chai').use(require('chai-string')).expect;
const HealthChecker = require('../../service/healthChecker.js');

var healthChecker;

createContainer = (current, min, max) => {
    return {
        currentTemperature: current,
        beer: {
            minTemperature: min,
            maxTemperature: max
        }
    }
}

describe('HealthChecker', () => {
    beforeEach(() => {
        healthChecker = new HealthChecker();
    })

    describe('#check', () => {
        it('check a list of containers and mark each one as healthy or not', () => {
            var containers = [createContainer(7, -3, 6), createContainer(0, -3, 6), createContainer(-7, -3, 6)]
            var checkedContainers = healthChecker.check(containers);

            expect(checkedContainers[0].isHealthy).to.be.false // first is out of the range
            expect(checkedContainers[1].isHealthy).to.be.true // second is between the range
            expect(checkedContainers[2].isHealthy).to.be.false // tird is out of the range
        });
    })

    describe('#isHealthy', () => {
        it('should return true if conteiner temperature is between the range', () => {
            var container = createContainer(-2, -3, 6);
            expect(healthChecker.isHealthy(container)).to.be.true
        })

        it('should return true if conteiner temperature is equal the min', () => {
            var container = createContainer(-3, -3, 6);
            expect(healthChecker.isHealthy(container)).to.be.true
        })

        it('should return true if conteiner temperature is equal the max', () => {
            var container = createContainer(6, -3, 6);
            expect(healthChecker.isHealthy(container)).to.be.true
        })

        it('should return false if conteiner temperature is under the min', () => {
            var container = createContainer(-5, -3, 6);
            expect(healthChecker.isHealthy(container)).to.be.false
        })

        it('should return false if conteiner temperature is above the max', () => {
            var container = createContainer(7, -3, 6);
            expect(healthChecker.isHealthy(container)).to.be.false
        })
    })
});
