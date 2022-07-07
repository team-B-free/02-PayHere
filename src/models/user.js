import { DataTypes, Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        mbti: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "USER",
        tableName: "USER",
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
    db.User.hasMany(db.Moneybook, { foreignKey: "user_id", allowNull: false });
  }
}

export default User;
