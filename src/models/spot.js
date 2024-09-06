const Sequelize = require('sequelize');

class Spot extends Sequelize.Model {
  static initiate(sequelize) {
    Spot.init(
      {
        spot_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        spot_name: {
          type: Sequelize.STRING(120),
          allowNull: false,
        },
        spot_address: {
          type: Sequelize.STRING(120),
          allowNull: false,
        },
        spot_lat: {
          type: Sequelize.DECIMAL(10, 8),
          allowNull: true,
        },
        spot_lng: {
          type: Sequelize.DECIMAL(11, 8),
          allowNull: true,
        },
        private_room: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        parking_lot: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        valet: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        corkage: {
          type: Sequelize.ENUM('no', 'free', 'charge'),
          allowNull: true,
        },
        max_group_seats: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        start_time: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        end_time: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        break_start_time: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        break_end_time: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        last_order_time: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        tel: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        // 0000000(일주일의 boolean화)
        open_day: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        rental: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        placard: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        indoor_toilet: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        wheelchair: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        promotion: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        news: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        // image url 어디에 서빙할지 (spot 테이블 or image 테이블)
        spot_main_img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        spot_sub_img_1: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        spot_sub_img_2: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        spot_sub_img_3: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        spot_sub_img_4: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        spot_sub_img_5: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Spot',
        tableName: 'spot',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(models) {
    // Spot은 여러 SectionLabel을 가질 수 있다 (1:N 관계)
    Spot.hasOne(models.SectionLabel, {
      foreignKey: 'spot_id',
      sourceKey: 'spot_id',
    });

    // Spot은 여러 TagLabel을 가질 수 있다 (1:N 관계)
    Spot.hasOne(models.TagLabel, {
      foreignKey: 'spot_id',
      sourceKey: 'spot_id',
    });

    // Spot은 여러 Menu를 가질 수 있다 (1:N 관계)
    Spot.hasOne(models.Menu, {
      foreignKey: 'spot_id',
      sourceKey: 'spot_id',
    });

    Spot.hasOne(models.Visit, {
      foreignKey: 'spot_id',
      sourceKey: 'spot_id',
    });
  }
}

module.exports = Spot;
