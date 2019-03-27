'use strict';
const data = require('./data');

module.exports = function(app) {
  const models = app.models;
  return {
    cleanDatabase: async() => {
      await Promise.all([
        models.officer.destroyAll(),
        models.bike.destroyAll(),
        models.department.destroyAll(),
      ]);
    },

    givenDepartmentOfficer: async() => {
      const department =
        convert(await models.department.create(data.department));
      const officer = convert(await models.officer.create({
        ...data.officer,
        departmentId: department.id,
      }));
      return {officer, department};
    },

    givenBike: async() => {
      const bike = convert(await models.bike.create(data.bike));
      return {bike};
    },

    givenDepartmentBike: async() => {
      const department =
        convert(await models.department.create(data.department));
      const bike = convert(await models.bike.create({
        ...data.bike,
        departmentId: department.id,
      }));
      return {department, bike};
    },

    givenDepartment: async() => {
      const department =
        convert(await models.department.create(data.department));
      return {department};
    },

    noFreeOfficers: async() => {
      const department =
        convert(await models.department.create(data.department));
      const officer = convert(await models.officer.create({
        ...data.officer,
        departmentId: department.id,
      }));
      const bike = convert(await models.bike.create({
        ...data.bike,
        departmentId: department.id,
        officerId: officer.id,
      }));
      return {officer, department, bike};
    },
  };
};

const convert = (lbModel) => JSON.parse(JSON.stringify(lbModel));
