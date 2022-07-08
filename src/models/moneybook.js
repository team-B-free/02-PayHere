import { DataTypes, Model } from "sequelize";

class Moneybook extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        is_shared: {
          type: DataTypes.STRING(1),
          allowNull: false,
          defaultValue: "N",
        },
        view: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "MONEYBOOK",
        tableName: "MONEYBOOK",
        charset: "utf8mb4", //이모지 가능
        collate: "utf8mb4_general_ci", //한글 저장되도록
        freezeTableName: true, //테이블명 이름 그대로 사용
        timestamps: true, //createdAt, updatedAt 컬럼 자동 추가
        paranoid: true, //deletedAt 컬럼 자동 추가
        underscored: true, //컬럼명 스네이크 형식으로 변경
      },
    );
  }

  static associate(db) {
    db.Moneybook.hasMany(db.MoneybookDetail, {
      foreignKey: "moneybook_id",
      allowNull: false,
    });
    db.Moneybook.hasMany(db.Comment, {
      foreignKey: "moneybook_id",
      allowNull: false,
    });
    db.Moneybook.belongsTo(db.User, {
      foreignKey: "user_id",
      allowNull: false,
    });
  }
}

export default Moneybook;
