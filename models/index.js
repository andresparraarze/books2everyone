const User = require('./User');
const Genre = require('./Genre');
const ReadingList = require('./ReadingList');
const BooksDetails = require('./BooksDetails');

// Genre.hasMany(BooksDetails, {
//   foreignKey: 'genre_id',
// });

// BooksDetails.belongsTo(Genre, {
//   foreignKey: 'genre_id',
// });

// ReadingList.hasMany(BooksDetails, {
//   foreignKey: 'genre_id',
// });


module.exports = { User, Genre, ReadingList, BooksDetails };
