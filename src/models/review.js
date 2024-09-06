const { Sequelize, DataTypes } = require('sequelize');

class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init(
      {
        review_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        visit_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'visit',
            key: 'visit_id',
          },
          allowNull: false,
        },
        rating: {
          type: DataTypes.TINYINT,
          allowNull: true,
        },
        review_text: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        review_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Review',
        tableName: 'review',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(models) {
    Review.belongsTo(models.Visit, {
      foreignKey: 'visit_id',
      targetKey: 'visit_id',
    });
  }
}

module.exports = Review;
