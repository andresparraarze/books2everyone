const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BooksDetails extends Model {}

BooksDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    published_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    average_rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    num_pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ratings_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    // freezeTableName: true,
    underscored: true,
    modelName: 'booksdetails',
    tableName: 'booksdetails',
    timestamps: false,
  }
);

module.exports = BooksDetails;
