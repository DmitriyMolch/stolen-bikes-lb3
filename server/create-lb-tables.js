var server = require('./server');
var ds = server.dataSources.mysql;
var lbTables = ['bike', 'department', 'officer'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
