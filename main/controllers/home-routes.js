const router = require('express').Router();
const { Genre, Book, BooksDetails } = require('../models');

// GET all genres for homepage
router.get('/', async (req, res) => {
  try {
    const dbBookData = await BooksDetails.findAll();

    const books = dbBookData.map((book) =>
    book.get({ plain: true })
    );

    res.render('homepage', {
      books,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one genre
router.get('/genres/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbGenreData = await Genre.findByPk(req.params.id, {
        include: [
          {
            model: Book,
            attributes: [
              'id',
              'title',
              'author',
              'filename',
              'description',
            ],
          },
        ],
      });
      const genre = dbGenreData.get({ plain: true });
      res.render('genre', { genre, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one book
router.get('/books/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the painting
    try {
      const dbBookData = await Book.findByPk(req.params.id);

      const book = dbBookData.get({ plain: true });

      res.render('book', { book, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
