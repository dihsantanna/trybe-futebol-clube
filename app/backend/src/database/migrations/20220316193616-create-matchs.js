'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.NUMBER,
        foreignKey: true,
        allowNull: false,
      },
      home_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.NUMBER,
        foreignKey: true,
        allowNull: false,
      },
      away_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.NUMBER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matchs');
  }
};