'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      foodType: {
        type: Sequelize.STRING
      },
      recipeUrl: {
        type: Sequelize.STRING
      },
      recipeImage: {
        type: Sequelize.STRING
      },
      ingredientList: {
        type: Sequelize.TEXT
      },
      ingredientCount: {
        type: Sequelize.INTEGER
      },
      calorieCount: {
        type: Sequelize.INTEGER
      },
      servingCount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};
