"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGameBiodata.belongsTo(models.UserGame, {
        foreignKey: "userGameId",
        as: "UserGame",
      });
    }
  }
  UserGameBiodata.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      userGameId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGameBiodata",
    }
  );
  return UserGameBiodata;
};
