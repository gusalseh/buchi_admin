const Sequelize = require("sequelize");

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
          allowNull: false,
          defaultValue: false,
        },
        parking_lot: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        valet: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        corkage: {
          type: Sequelize.ENUM("no", "free", "charge"),
          allowNull: false,
          defaultValue: "no",
        },
        max_group_seats: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        start_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        end_time: {
          type: Sequelize.TIME,
          allowNull: false,
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
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        rental: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        placard: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        indoor_toilet: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        wheelchair: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
          allowNull: false,
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
        modelName: "Spot",
        tableName: "spot",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(models) {}
}

module.exports = Spot;
