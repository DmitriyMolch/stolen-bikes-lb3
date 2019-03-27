'use strict';

const {expect} = require('chai');
const server = require('../../../server');
const {query} = require('../../../../common/models/helper');

describe('Models helper', () => {
  it('returns err with incorrect sql', async() => {
    const ds = server.datasources.mysql;
    const sql = 'wrong';
    try {
      await query(ds, sql);
    } catch (err) {
      expect(err.sqlState).is.eql('42000');
    }
  });
});
