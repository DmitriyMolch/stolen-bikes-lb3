'use strict';

const {expect} = require('chai');
const server = require('../../../server');
const {cleanDatabase, createOfficerAndDepartment} =
  require('../helpers/database')(server);
const {createBike} = require('../helpers/request')(server);
let data, bike;

describe('Bike', () => {
  beforeEach(cleanDatabase);
  beforeEach(async() => {
    bike = {
      license: 'AB123',
      color: 'red',
      type: 'mountain',
      owner: 'John Smith',
      date: (new Date()).toISOString(),
      description: 'Stolen from house.',
    };
    data = await createOfficerAndDepartment();
  });

  it('creates bike', async() => {
    const res = await createBike(bike).expect(200);
    const expected = Object.assign(bike, {
      id: res.body.id,
      found: false,
    });
    expect(res.body).is.eql(expected);
  });

  it('returns error 400 trying to create bike with found !== false',
    async() => {
      bike.found = true;
      const res = await createBike(bike).expect(400);
      const error = res.body.error;
      expect(error.name).is.eql('BadRequestError');
      expect(error.message).is.eql('"found" field should be equal false');
    });

  it('returns error 400 trying to create bike with officerId', async() => {
    bike.officerId = data.officer.id;
    const res = await createBike(bike).expect(400);
    const error = res.body.error;
    expect(error.name).is.eql('BadRequestError');
    expect(error.message).is.eql('"officerId" field should be empty');
  });

  it('returns error 400 trying to create bike with departmentId', async() => {
    bike.departmentId = data.department.id;
    const res = await createBike(bike).expect(400);
    const error = res.body.error;
    expect(error.name).is.eql('BadRequestError');
    expect(error.message).is.eql('"departmentId" field should be empty');
  });
});
