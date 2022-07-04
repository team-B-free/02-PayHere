import dotenv from "dotenv";
dotenv.config();

import Sequelize from 'sequelize';

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

db.sequelize = sequelize;

export default db;