'use strict';

module.exports = {
  bike: {
    license: 'AB123',
    color: 'red',
    type: 'mountain',
    owner: 'John Smith',
    date: (new Date(Math.floor(Date.now() / 1000) * 1000)).toISOString(),
    description: 'Stolen in the street.',
  },
  department: {
    name: 'Bikes Search',
  },
  officer: {
    name: 'John Smith',
  },
};
