const { Sequelize, DataTypes } = require('sequelize');

class SectionLabel extends Sequelize.Model {
  static initiate(sequelize) {
    SectionLabel.init(
      {
        section_label_id: {
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
        main_section_1: {
          type: DataTypes.ENUM,
          values: ['korean', 'chinese', 'japanese', 'western', 'asian', 'fusion'],
          allowNull: false,
        },
        main_section_2: {
          type: DataTypes.ENUM,
          values: [
            'pork_belly', //삼겹살
            'chicken', //치킨
            'grilled_beef', //소고기구이
            'pork_libs', //돼지갈비
            'chinese_cuisine', //중국요리
            'sashimi', //회
          ],
          allowNull: true,
        },
        sub_section_1: {
          type: DataTypes.ENUM,
          values: [
            'small', //4인 이하 추천
            'medium', //12인 이하 추천
            'large', //13인 이상 추천
          ],
          allowNull: false,
        },
        sub_section_2: {
          type: DataTypes.ENUM,
          values: [
            'light', //가볍게 먹기 좋은
            'heavy', //푸짐한
            'effective', //가성비 좋은
          ],
          allowNull: false,
        },
        sub_section_3: {
          type: DataTypes.ENUM,
          values: [
            'korean_liquar', //전통주
            'wine', //와인
            'whisky', //위스키
            'cocktail', //칵테일
          ],
          allowNull: false,
        },
        sub_section_4: {
          type: DataTypes.ENUM,
          values: [
            'both_prefer', //남녀 모두 좋아하는
            'male_prefer', //남성이 좋아하는
            'female_prefer', //여성이 좋아하는
          ],
          allowNull: false,
        },
        sub_section_5: {
          type: DataTypes.ENUM,
          values: [
            'hot', //더운날
            'cold', //추운날
            'rain', //비오는날
            'snow', //눈오는날
          ],
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'SectionLabel',
        tableName: 'section_label',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    SectionLabel.belongsTo(models.Spot, {
      foreignKey: 'spot_id',
      targetKey: 'spot_id',
    });
  }
}

module.exports = SectionLabel;
