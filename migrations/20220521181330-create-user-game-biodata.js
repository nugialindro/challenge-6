"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserGameBiodata", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userGameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "UserGames",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserGameBiodata");
  },
};
