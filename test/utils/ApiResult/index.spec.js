const ApiResult = require('../../../app/utils/ApiResult');

describe('ApiResult', () => {
  it('it should return an object with default properties values', () => {
    const res = new ApiResult();

    res.should.be.an('object');
    res.should.have.property('success');
    res.should.have.property('data');
    res.should.have.property('status');
  });

  it('it should return an object with correct properties and its values', () => {
    const res = new ApiResult({ example: 'example' }, 200);

    res.should.be.an('object');
    res.should.have.property('success');
    res.should.have
      .property('data')
      .to.have.property('example')
      .eql('example');
    res.should.have.property('status').eql(200);
  });
});
