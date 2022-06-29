const User = require('./User');
const Genre = require('./Genre');
const Book = require('./Book');
const BooksDetails = require('./BooksDetails');

Genre.hasMany(Book, {
  foreignKey: 'genre_id',
});

Book.belongsTo(Genre, {
  foreignKey: 'genre_id',
});

module.exports = { User, Genre, Book, BooksDetails };
