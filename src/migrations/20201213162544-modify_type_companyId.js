'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('Blogs', {
        fields: ['companyId'],
        type: 'foreign key',
        name: 'Blogs_companyId_fkey',
        references: {
          table: 'Companies',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Blogs', {
        fields: ['author'],
        type: 'foreign key',
        name: 'Blogs_author_fkey',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Events', {
        fields: ['companyId'],
        type: 'foreign key',
        name: 'Events_companyId_fkey',
        references: {
          table: 'Companies',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Events', {
        fields: ['author'],
        type: 'foreign key',
        name: 'Events_author_fkey',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('Jobs', {
        fields: ['companyId'],
        type: 'foreign key',
        name: 'Jobs_companyId_fkey',
        references: {
          table: 'Companies',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('Blogs', 'Blogs_companyId_fkey'),
      queryInterface.removeConstraint('Blogs', 'Blogs_author_fkey'),
      queryInterface.removeConstraint('Events', 'Events_companyId_fkey'),
      queryInterface.removeConstraint('Events', 'Events_author_fkey'),
      queryInterface.removeConstraint('Jobs', 'Jobs_companyId_fkey')
    ]);
  },
};

