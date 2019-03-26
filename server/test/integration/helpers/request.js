'use strict';
const request = require('supertest');

module.exports = function(server) {
  return {
    createBike: (bike) => request(server).post('/api/bikes').send(bike),
    findBikes: (filter) =>
      request(server).get(`/api/bikes?${getFilter(filter)}`),
    findDepartmentByBikeId: (bikeId) =>
      request(server).get(`/api/bikes/${bikeId}/department`),
    createDepartment: (department) =>
      request(server).post('/api/departments').send(department),
    createOfficer: (officer) =>
      request(server).post('/api/officers').send(officer),
  };
};

const getFilter = (filter = {}) => {
  let query = '';
  for (const field in filter) {
    query += `filter[where][${field}]=${filter[field]}&`;
  }
  return query;
};
