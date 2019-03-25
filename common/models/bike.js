'use strict';

module.exports = function(Bike) {
  Bike.beforeRemote('create', async() => {
    Bike.validatesInclusionOf('found', {in: [false]});
    Bike.validatesAbsenceOf('officerId');
    Bike.validatesAbsenceOf('departmentId');
  });
};
