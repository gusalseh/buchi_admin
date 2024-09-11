const Sequelize = require('sequelize');

class UserLocation extends Sequelize.Model {
  static initiate(sequelize) {
    UserLocation.init(
      {
        location_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'user_id',
          },
        },
        location_type: {
          type: Sequelize.ENUM('onsite', 'offsite', 'etc'),
          allowNull: false,
        },
        location_name: {
          type: Sequelize.STRING(120),
          allowNull: true,
        },
        location_building_name: {
          type: Sequelize.STRING(120),
          allowNull: true,
        },
        location_road_address: {
          type: Sequelize.STRING(120),
          allowNull: false,
        },
        location_jibun_address: {
          type: Sequelize.STRING(120),
          allowNull: true,
        },
        location_lat: {
          type: Sequelize.DECIMAL(10, 8),
          allowNull: true,
        },
        location_lng: {
          type: Sequelize.DECIMAL(11, 8),
          allowNull: true,
        },
        selected: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'UserLocation',
        tableName: 'user_location',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
}

module.exports = UserLocation;
