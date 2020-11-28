'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Blogs',
        'content',
        {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Blogs', 
        'category',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Blogs', 
        'tags',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Blogs', 
        'author',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Blogs', 
        'image',
        {
          type: Sequelize.BLOB,
          allowNull: true,
        },
      ),

    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Blogs', 'content'),
      queryInterface.removeColumn('Blogs', 'category'),
      queryInterface.removeColumn('Blogs', 'tags'),
      queryInterface.removeColumn('Blogs', 'author'),
      queryInterface.removeColumn('Blogs', 'image'),

    ]);
  },
};
