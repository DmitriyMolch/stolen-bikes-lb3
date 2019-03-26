'use strict';

const {expect} = require('chai');
const server = require('../../../server');
const {cleanDatabase} = require('../helpers/database')(server);
const {createDepartment} = require('../helpers/request')(server);
const data = require('../helpers/data');

describe('Department', () => {
  describe('create', () => {
    beforeEach(cleanDatabase);

    it('creates department', async() => {
      const res = await createDepartment(data.department).expect(200);
      const expected = {
        ...data.department,
        id: res.body.id,
      };
      expect(res.body).is.eql(expected);
    });

    it('returns error trying to create department  without name', async() => {
      const res = await createDepartment({name: ''}).expect(422);
      const error = res.body.error;
      expect(error.name).is.eql('ValidationError');
      expect(error.message).is.eql('The `department` instance is not valid. ' +
        'Details: `name` can\'t be blank (value: "").');
    });
  });
});
