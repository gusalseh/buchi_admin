const { Sequelize, DataTypes } = require('sequelize');

class TagLabel extends Sequelize.Model {
  static initiate(sequelize) {
    TagLabel.init(
      {
        tag_label_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        spot_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'spot',
            key: 'spot_id',
          },
        },
        tag_1: {
          type: DataTypes.ENUM,
          values: [
            'friendly', //친한사람과 함께
            'partner', //동료와 함께
            'boss', //상사와 함께
            'executive', //임원과 함께
            'vendor', //거래처와 함께
            'foreigner', //외국인과 함께
          ],
          allowNull: false,
        },
        tag_2: {
          type: DataTypes.ENUM,
          values: [
            'quiet', //조용한담소
            'chatter', //활발한수다
            'noisy', //시끌벅적한
          ],
          allowNull: false,
        },
        tag_3: {
          type: DataTypes.ENUM,
          values: ['casual', 'modern', 'formal', 'traditional', 'exotic'],
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'TagLabel',
        tableName: 'card_label',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(models) {
    // TagLabel은 Spot에 속한다
    TagLabel.belongsTo(models.Spot, {
      foreignKey: 'spot_id',
      targetKey: 'spot_id',
    });
  }
}

module.exports = TagLabel;
