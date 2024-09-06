const { Sequelize, DataTypes } = require('sequelize');

class Visit extends Sequelize.Model {
  static initiate(sequelize) {
    Visit.init(
      {
        visit_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'user_id',
          },
          allowNull: false,
        },
        spot_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'spot',
            key: 'spot_id',
          },
          allowNull: false,
        },
        visit_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Visit', // 모델 이름 설정
        tableName: 'visit', // 테이블 이름을 명시적으로 지정
        timestamps: false,
      }
    );
  }
  static associate(models) {
    Visit.belongsTo(models.Spot, {
      foreignKey: 'spot_id',
      targetKey: 'spot_id',
    });
  }
  static associate(models) {
    Visit.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
    });
  }
}

module.exports = Visit;
