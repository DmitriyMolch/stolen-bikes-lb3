'use strict';

module.exports = function(app) {
  return {
    cleanDatabase: async() => {
      await Promise.all([
        app.models.officer.destroyAll(),
        app.models.bike.destroyAll(),
        app.models.department.destroyAll(),
      ]);
    },

    createOfficerAndDepartment: async() => {
      const department = await app.models.department.create({
        name: 'Bikes Search',
      });
      const officer = await app.models.officer.create({
        name: 'John Smith',
        departmentId: department.id,
      });
      return {officer, department};
    },
  };
};
