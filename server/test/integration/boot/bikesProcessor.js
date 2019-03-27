'use strict';

const {expect} = require('chai');
const server = require('../../../server');
const {cleanDatabase, givenDepartmentOfficer, noFreeOfficers} =
  require('../helpers/database')(server);
const {createBike, findBikes} = require('../helpers/request')(server);
let given, bike;
const data = require('../helpers/data');

describe('bikesProcessor', function() {
  beforeEach(cleanDatabase);
  const {checkInterval} = server.get('bikesProcessor');
  const testTimeout = checkInterval + 3000;
  const findRequestTimeout = checkInterval + 1000;

  describe('Has free officer', () => {
    beforeEach(async() => {
      given = await givenDepartmentOfficer();
      const res = await createBike(data.bike).expect(200);
      bike = res.body;
    });
    it('finds assigned bike to the given officer and department', async() => {
      return new Promise(resolve => {
        setTimeout(async() => {
          const res = await findBikes().expect(200);
          const expected = [{
            ...bike,
            officerId: given.officer.id,
            departmentId: given.department.id,
          }];
          expect(res.body).is.eql(expected);
          resolve();
        }, findRequestTimeout);
      });
    }).timeout(testTimeout);
  });

  describe('No free officers', () => {
    beforeEach(async() => {
      given = await noFreeOfficers();
      const res = await createBike(data.bike).expect(200);
      bike = res.body;
    });
    it('finds assigned bike to the given officer and department', async() => {
      return new Promise(resolve => {
        setTimeout(async() => {
          const res = await findBikes().expect(200);
          const expected = {
            ...bike,
            officerId: null,
            departmentId: null,
          };
          expect(res.body[1]).is.eql(expected);
          resolve();
        }, findRequestTimeout);
      });
    }).timeout(testTimeout);
  });
});
