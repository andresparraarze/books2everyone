const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReadingList extends Model {}

ReadingList.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'book',
      //   key: 'id',
      // },
    },
    user_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },
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
