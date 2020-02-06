'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    selectdoctor: DataTypes.STRING,
    date: DataTypes.STRING,
    descriptation: DataTypes.STRING,
    address:DataTypes.STRING,
    mobile:DataTypes.STRING,
    password:DataTypes.STRING
  }, {});
  Patient.associate = function(models) {
    Patient.belongsToMany(models.Doctordata, {through: 'Doctorpatient',foreignKey: 'patientid'});
  };
  return Patient;
};