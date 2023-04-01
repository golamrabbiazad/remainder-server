import { Sequelize, INTEGER, STRING, DATE } from "sequelize";

export const sequelize = new Sequelize("sqlite::memory:");

export const Reminder = sequelize.define("Reminder", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: STRING,
    allowNull: false,
  },
  user: {
    type: INTEGER,
    allowNull: false,
  },
  date: {
    type: DATE,
    allowNull: false,
  },
});
