'use strict';

module.exports = {
  query: (dataSource, sql) => {
    return new Promise((resolve, reject) => {
      dataSource.connector.query(sql, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },
};
