module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Companies',
        'slug',
        {
          type: Sequelize.STRING,
          unique: true
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('companies', 'slug')
    ]);
  }
};