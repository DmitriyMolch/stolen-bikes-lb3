'use strict';

const {expect} = require('chai');
const server = require('../../../server');
const {cleanDatabase, givenDepartment} = require('../helpers/database')(server);
const {createOfficer} = require('../helpers/request')(server);
const data = require('../helpers/data');

describe('Officer', () => {
  describe('create', () => {
    let given;
    beforeEach(async() => {
      given = await givenDepartment();
    });
    beforeEach(cleanDatabase);

    it('creates officer', async() => {
      const res = await createOfficer({
        ...data.officer,
        departmentId: given.department.id,
      }).expect(200);
      const expected = {
        ...data.officer,
        id: res.body.id,
        departmentId: given.department.id,
      };
      expect(res.body).is.eql(expected);
    });

    it('returns error trying to create officer  without name', async() => {
      const res = await createOfficer({
        name: '',
        departmentId: given.department.id,
      }).expect(422);
      const error = res.body.error;
      expect(error.name).is.eql('ValidationError');
      expect(error.message).is.eql('The `officer` instance is not valid. ' +
        'Details: `name` can\'t be blank (value: "").');
    });

    it('returns error trying to create officer  without department',
      async() => {
        const res = await createOfficer(data.officer).expect(422);
        const error = res.body.error;
        expect(error.name).is.eql('ValidationError');
        expect(error.message).is.eql('The `officer` instance is not valid. ' +
          'Details: `departmentId` can\'t be blank (value: undefined).');
      });
  });
});
