'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctorpatient = sequelize.define('Doctorpatient', {
    doctorid: DataTypes.INTEGER,
    patientid: DataTypes.INTEGER
  }, {});
  Doctorpatient.associate = function(models) {
    // associations can be defined here
  };
  return Doctorpatient;
};