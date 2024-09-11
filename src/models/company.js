const { Sequelize, DataTypes } = require('sequelize');

class Company extends Sequelize.Model {
  static initiate(sequelize) {
    Company.init(
      {
        company_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        company_name: {
          type: DataTypes.STRING(80),
          allowNull: false,
        },
        industry_type: {
          type: DataTypes.ENUM,
          values: [
            'service',
            'finance_banking',
            'IT_telecommunications',
            'sales_distribution',
            'manufacturing_production_chemicals',
            'education',
            'construction',
            'medical_pharmaceutical',
            'media_advertisement',
            'cultural_art_design',
            'institution_association',
          ],
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Company', // 모델 이름 설정
        tableName: 'company', // 테이블 이름을 명시적으로 지정
        timestamps: false,
      }
    );
  }

  static getIndustryTypeMappings() {
    return {
      service: '서비스',
      finance_banking: '금융·은행',
      IT_telecommunications: 'IT·정보통신',
      sales_distribution: '판매·유통',
      manufacturing_production_chemicals: '제조·생산·화학',
      education: '교육',
      construction: '건설',
      medical_pharmaceutical: '의료·제약',
      media_advertisement: '미디어·광고',
      cultural_art_design: '문화·예술·디자인',
      institution_association: '기관·협회',
    };
  }

  static getIndustryTypes() {
    const mappings = this.getIndustryTypeMappings();
    return this.rawAttributes.industry_type.values.map((value) => mappings[value] || value);
  }

  static reverseIndustryTypeMappings() {
    return {
      서비스: 'service',
      '금융·은행': 'finance_banking',
      'IT·정보통신': 'IT_telecommunications',
      '판매·유통': 'sales_distribution',
      '제조·생산·화학': 'manufacturing_production_chemicals',
      교육: 'education',
      건설: 'construction',
      '의료·제약': 'medical_pharmaceutical',
      '미디어·광고': 'media_advertisement',
      '문화·예술·디자인': 'cultural_art_design',
      '기관·협회': 'institution_association',
    };
  }

  static associate(db) {
    // User 모델과의 관계 설정
    this.hasMany(db.User, {
      foreignKey: 'company_id', // User 테이블의 외래 키
      sourceKey: 'company_id',
    });
  }
}

module.exports = Company;
