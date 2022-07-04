const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReadingList extends Model {}

ReadingList.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'readinglist',
  }
);

module.exports = ReadingList;
