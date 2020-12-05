module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Blogs',
        'companyId',
        {
          type: Sequelize.STRING,
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('Blogs', 'companyId')
    ]);
  }
};