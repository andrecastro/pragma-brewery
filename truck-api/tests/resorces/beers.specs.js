const beers = require('../../resources/beers');
const expect = require('chai').use(require('chai-string')).expect;
const sinon = require('sinon');

describe('Beers resource', () => {
    describe('#index', () => {
        it('should return list of beers as json', (done) => {
            var req = {}
            var res = {
                json: (data) => {
                    expect(data).to.not.be.null
                    expect(res.json.calledOnce).to.be.true
                    done();
                }
            }

            sinon.spy(res, 'json');
            beers.index(req, res);
        })
    })
})
