'use strict';

module.exports = async function(app) {
  const ds = app.dataSources.mysql;
  const schemas = ['bike', 'department', 'officer'];
  for (let i = 0; i < schemas.length; ++i) {
    await ds.autoupdate(schemas[i]);
  }
};
