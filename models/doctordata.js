'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctordata = sequelize.define('Doctordata', {
    Name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // conpassword: DataTypes.STRING,
    education: DataTypes.STRING,
    Degination: DataTypes.STRING,
    Adress: DataTypes.STRING,
    mobile: DataTypes.STRING,
    roles: DataTypes.STRING
  }, {});
  Doctordata.associate = function(models) {
    // Doctordata.belongsTo(models.Doctorpatient,{
    //   foreignKey: 'doctorid'
    // })
    Doctordata.belongsToMany(models.Patient, {through: 'Doctorpatient',foreignKey: 'doctorid'});

    // associations can be defined here
  };
  return Doctordata;
};