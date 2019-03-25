'use strict';

module.exports = async function(app) {
  setInterval(async() => {
    const bikes = await app.models.bike.find({
      where: {officerId: {eq: null}},
      order: 'date ASC',
    });
    const officers = await app.models.officer.getFree();
    let promises = [];
    bikes.some(bike => {
      if (!officers.length) return true;
      const index = Math.round(Math.random() * (officers.length - 1));
      const officer = officers[index];
      promises.push(bike.updateAttributes({
        'officerId': officer.id,
        'departmentId': officer.departmentId,
      }));
      officers.splice(index, 1);
    });
    await Promise.all(promises);
  }, 1000);
};
