const { Sequelize, DataTypes } = require("sequelize");

class Menu extends Sequelize.Model {
  static initiate(sequelize) {
    Menu.init(
      {
        menu_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        spot_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: "spot",
            key: "spot_id",
          },
        },
        menu_name: {
          type: DataTypes.STRING(80),
          allowNull: false,
        },
        menu_type: {
          type: DataTypes.ENUM,
          values: ["maindish", "sidedish", "liquar", "beverage"],
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        menu_img: {
          type: DataTypes.STRING(120),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Menu",
        tableName: "menu",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(models) {
    Menu.belongsTo(models.Spot, {
      foreignKey: "spot_id",
      targetKey: "spot_id",
    });
  }
}

module.exports = Menu;
