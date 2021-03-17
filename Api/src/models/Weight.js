const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = global.sequelize.define('Weight', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  userID: Sequelize.INTEGER(11),
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
