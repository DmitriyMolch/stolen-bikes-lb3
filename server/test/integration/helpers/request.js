'use strict';
const request = require('supertest');

module.exports = function(server) {
  return {
    createBike: (bike) => request(server).post('/api/bikes').send(bike),
    findBikes: (filter) =>
      request(server).get(`/api/bikes?${getFilter(filter)}`),
  };
};

const getFilter = (filter = {}) => {
  let query = '';
  for (const field in filter) {
    query += `filter[where][${field}]=${filter[field]}&`;
  }
  return query;
};
