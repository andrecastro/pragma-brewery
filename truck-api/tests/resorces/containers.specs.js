const containers = require('../../resources/containers');
const containersRepository = require('../../repository/containersRepository');
const expect = require('chai').use(require('chai-string')).expect;
const sinon = require('sinon');

describe('Containers resource', () => {
    describe('#index', () => {
        it('should return list of containers as json', (done) => {
            var req = {}
            var res = {
                json: (data) => {
                    expect(data).to.not.be.null
                    expect(res.json.calledOnce).to.be.true
                    done();
                }
            }

            sinon.spy(res, 'json');
            containers.index(req, res);
        })
    })

    describe('#create', () => {
        afterEach(()=> {
            containersRepository.create.restore();
        })

        it('should call containersRepository#create', (done) => {
            var req = {
                body: 'fake container'
            }
            var res = {};
            sinon.stub(containersRepository, 'create').callsFake((container) => {
                expect(container).to.be.equal('fake container');
                done()
            });
            containers.create(req, res);
        })

        it('should return a json and 201 as status code', (done) => {
            var createdContainer = 'returned container'
            var req = {
                body: "value"
            }
            var res = {};
            res.json = (data) => {
                expect(data).to.be.equal(createdContainer);
                done();
            }
            res.status = (status) => {
                expect(status).to.be.equal(201);
                return res;
            }

            sinon.stub(containersRepository, 'create').callsFake((container) => {
                expect(container).to.be.equal(req.body);
                return createdContainer;
            });
            
            containers.create(req, res);
        })
    })

    describe('#delete', () => {
        afterEach(()=> {
            containersRepository.remove.restore();
        })

        it('should call containersRepository#delete', (done) => {
            var req = {
                params: {
                    id: 12
                }
            }
            var res = {};

            sinon.stub(containersRepository, 'remove').callsFake((id) => {
                expect(id).to.be.equal(req.params.id);
                done();
            });
            
            containers.delete(req, res);
        })

        it('should return 202 as status code', (done) => {
            var req = {
                params: {
                    id: 12
                }
            }
            var res = {};
            res.sendStatus = (status) => {
                expect(status).to.be.equal(202);
                done();
            }

            sinon.stub(containersRepository, 'remove').callsFake((id) => {
                expect(id).to.be.equal(req.params.id);
            });
            
            containers.delete(req, res);
        })
    })

    describe('#update', () => {
        afterEach(()=> {
            containersRepository.update.restore();
        })

        it('should call containersRepository#update', (done) => {
            var updatedContainer = 'updated container';
            var req = {
                params: {
                    id: 12
                },
                body: "value"
            }
            var res = {};

            sinon.stub(containersRepository, 'update').callsFake((id, container) => {
                expect(id).to.be.equal(req.params.id);
                expect(container).to.be.equal(req.body);
                done();
            });
            
            containers.update(req, res);
        })

        it('should return 200 as status code and return the updated container', (done) => {
            var updatedContainer = 'updated container';
            var req = {
                params: {
                    id: 12
                },
                body: "value"
            }
            var res = {};
            res.json = (data) => {
                expect(data).to.be.equal(updatedContainer);
                done();
            }
            res.status = (status) => {
                expect(status).to.be.equal(200);
                return res;
            }

            sinon.stub(containersRepository, 'update').callsFake((id, container) => {
                expect(id).to.be.equal(req.params.id);
                expect(container).to.be.equal(req.body);
                return updatedContainer;
            });
            
            containers.update(req, res);
        })
    })
})
