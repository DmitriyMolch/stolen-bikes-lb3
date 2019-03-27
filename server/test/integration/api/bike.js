'use strict';

const {expect} = require('chai');
const server = require('../../../server');
const {cleanDatabase, givenDepartmentOfficer, givenBike, givenDepartmentBike} =
  require('../helpers/database')(server);
const {createBike, findBikes, findDepartmentByBikeId} =
  require('../helpers/request')(server);
let given;
const data = require('../helpers/data');

describe('Bike', () => {
  describe('create', () => {
    beforeEach(cleanDatabase);
    beforeEach(async() => {
      given = await givenDepartmentOfficer();
    });

    it('creates bike', async() => {
      const res = await createBike(data.bike).expect(200);
      const expected = {
        ...data.bike,
        id: res.body.id,
        found: false,
      };
      expect(res.body).is.eql(expected);
    });

    it('returns error trying to create bike with found !== false', async() => {
      const res = await createBike({...data.bike, found: true}).expect(400);
      const error = res.body.error;
      expect(error.name).is.eql('BadRequestError');
      expect(error.message).is.eql('"found" field should be equal false');
    });

    it('returns error trying to create bike with officerId', async() => {
      const res = await createBike({
        ...data.bike,
        officerId: given.officer.id,
      }).expect(400);
      const error = res.body.error;
      expect(error.name).is.eql('BadRequestError');
      expect(error.message).is.eql('"officerId" field should be empty');
    });

    it('returns error trying to create bike with departmentId', async() => {
      const res = await createBike({
        ...data.bike,
        departmentId: given.department.id,
      }).expect(400);
      const error = res.body.error;
      expect(error.name).is.eql('BadRequestError');
      expect(error.message).is.eql('"departmentId" field should be empty');
    });
  });

  describe('find', () => {
    let given = {};
    before(async() => {
      await cleanDatabase();
      given = await givenBike();
    });

    it('finds all bikes', async() => {
      const res = await findBikes().expect(200);
      const expected = [{
        ...given.bike,
        officerId: null,
        departmentId: null,
      }];
      expect(res.body).is.eql(expected);
    });

    it('finds bike by color', async() => {
      const res = await findBikes({color: given.bike.color}).expect(200);
      const expected = [{
        ...given.bike,
        officerId: null,
        departmentId: null,
      }];
      expect(res.body).is.eql(expected);
    });

    it('finds no bike by wrong color', async() => {
      const res = await findBikes({color: 'wrong'}).expect(200);
      expect(res.body).has.length(0);
    });

    it('finds bike by color and type', async() => {
      const res = await findBikes({
        color: given.bike.color,
        type: given.bike.type,
      }).expect(200);
      const expected = [{
        ...given.bike,
        officerId: null,
        departmentId: null,
      }];
      expect(res.body).is.eql(expected);
    });

    it('finds no bike by correct color and wrong type', async() => {
      const res = await findBikes({
        color: given.bike.color,
        type: 'wrong',
      }).expect(200);
      expect(res.body).has.length(0);
    });
  });

  describe('find department by bike', () => {
    let given = {};
    before(async() => {
      await cleanDatabase();
      given = await givenDepartmentBike();
    });

    it('finds department by bike', async() => {
      const res = await findDepartmentByBikeId(given.bike.id).expect(200);
      expect(res.body).is.eql(given.department);
    });

    it('returns error trying to find department with wrong bike.id',
      async() => {
        const res = await findDepartmentByBikeId('wrong').expect(404);
        const error = res.body.error;
        expect(error.name).is.eql('Error');
        expect(error.message).is.eql('could not find a model with id wrong');
      });
  });
});
