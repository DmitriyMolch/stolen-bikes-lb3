'use strict';
const {query} = require('./helper');

module.exports = function(Officer) {
  Officer.getFree = async() => {
    const ds = Officer.dataSource;
    const sql =
        `SELECT o.id, o.name, o.departmentId FROM officer as o 
        LEFT JOIN bike as b ON b.officerId = o.id
        WHERE b.officerId IS null`;
    const officers = await query(ds, sql);
    return officers.map(fields => new Officer(fields));
  };
};
