'use strict';

module.exports = function(Officer) {
  Officer.getFree = () => {
    const ds = Officer.dataSource;
    const sql =
        `SELECT o.id, o.name, o.departmentId FROM officer as o 
        LEFT JOIN bike as b ON b.officerId = o.id
        WHERE b.officerId IS null`;
    return new Promise((resolve, reject) => {
      ds.connector.query(sql, (err, officers) => {
        if (err) reject(err);
        resolve(officers.map(fields => new Officer(fields)));
      });
    });
  };
};
