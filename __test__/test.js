'use strict';
// const keys = require('../keys');
// const index = require('../index');
// const liri = require('../liri');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Practice Test', () => {
  it('should return true', () => {
    expect(true).to.equal(true);
  })
})