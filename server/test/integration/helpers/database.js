'use strict';
const data = require('./data');

module.exports = function(app) {
  return {
    cleanDatabase: async() => {
      await Promise.all([
        app.models.officer.destroyAll(),
        app.models.bike.destroyAll(),
        app.models.department.destroyAll(),
      ]);
    },

    givenDepartmentOfficer: async() => {
      const department =
        convert(await app.models.department.create(data.department));
      const officer =
        convert(await app.models.officer.create({
          ...data.officer,
          departmentId: department.id,
        }));
      return {officer, department};
    },

    givenBike: async() => {
      const bike = convert(await app.models.bike.create(data.bike));
      return {bike};
    },

    givenDepartmentBike: async() => {
      const department =
        convert(await app.models.department.create(data.department));
      const bike = convert(await app.models.bike.create({
        ...data.bike,
        departmentId: department.id,
      }));
      return {department, bike};
    },

    givenDepartment: async() => {
      const department =
        convert(await app.models.department.create(data.department));
      return {department};
    },
  };
};

const convert = (lbModel) => JSON.parse(JSON.stringify(lbModel));
