'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'patients',
        'address',
        {
          type: Sequelize.STRING,
          after:"date"
        }
      ),
      queryInterface.addColumn(
        'patients',
        'mobile',
        {
          type: Sequelize.STRING,
          after:"date"
        }
      ),
      queryInterface.addColumn(
        'patients',
        'password',
        {
          type: Sequelize.STRING,
          after:"date"
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('patients', 'address'),
      queryInterface.removeColumn('patients', 'mobile'),
      queryInterface.removeColumn('patients', 'password'),
    ]);
  }
};