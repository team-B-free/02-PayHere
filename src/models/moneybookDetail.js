import { DataTypes, Model } from "sequelize";

class MoneybookDetail extends Model {
  static init(sequelize) {
    return super.init(
      {
        money: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        memo: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        money_type: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        occured_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "MONEYBOOK_DETAIL",
        tableName: "MONEYBOOK_DETAIL",
        charset: "utf8mb4", //이모지 가능
        collate: "utf8mb4_general_ci", //한글 저장되도록
        freezeTableName: true, //테이블명 이름 그대로 사용
        timestamps: true, //createdAt, updatedAt 컬럼 자동 추가
        paranoid: true, //deletedAt 컬럼 자동 추가
        underscored: true, //컬럼명 스네이크 형식으로 변경
      }
    );
  }

  static associate(db) {
    db.MoneybookDetail.belongsTo(db.Moneybook, {
      foreignKey: "moneybook_id",
      allowNull: false,
    });
  }
}

export default MoneybookDetail;
