import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";
import MoneybookDetail from "./moneybookDetail.js";
import Moneybook from "./moneybook.js";
import User from "./user.js";
import Comment from "./comment.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.DB_TIMEZONE,
    logging: false,
  }
);

const db = {};

db.sequelize = sequelize;

db.MoneybookDetail = MoneybookDetail;
db.Moneybook = Moneybook;
db.User = User;
db.Comment = Comment;

MoneybookDetail.init(sequelize);
Moneybook.init(sequelize);
User.init(sequelize);
Comment.init(sequelize);

MoneybookDetail.associate(db);
Moneybook.associate(db);
User.associate(db);
Comment.associate(db);

export default db;
