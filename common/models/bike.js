'use strict';
const httpErrors = require('http-errors');

module.exports = function(Bike) {
  Bike.beforeRemote('create', async(ctx) => {
    const bike = ctx.args.data;
    if (bike.found && bike.found !== false)
      throw new httpErrors.BadRequest('"found" field should be equal false');
    if (bike.officerId || bike.officerId === 0)
      throw new httpErrors.BadRequest('"officerId" field should be empty');
    if (bike.departmentId || bike.departmentId === 0)
      throw new httpErrors.BadRequest('"departmentId" field should be empty');
  });
};
