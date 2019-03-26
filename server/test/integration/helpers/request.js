'use strict';
const request = require('supertest');

module.exports = function(server) {
  return {
    createBike: (bike) => request(server).post('/api/bikes').send(bike),
  };
};
