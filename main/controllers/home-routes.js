const router = require('express').Router();
const { Genre, Book, BooksDetails } = require('../models');

// GET all genres for homepage
router.get('/', async (req, res) => {
  try {
    const dbgenreData = await Genre.findAll();

    const genres = dbgenreData.map((genre) =>
    genre.get({ plain: true })
    );

    res.render('homepage', {
      genres,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one genre
router.get('/genres/:name', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbGenreData = await BooksDetails.findAll({
        where: {categories :req.params.name}
      });
      
      const books = dbGenreData.map((book) =>
      book.get({ plain: true })
      );
      
      res.render('genre', { books, loggedIn: req.session.loggedIn });
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
      const dbBookData = await BooksDetails.findByPk(req.params.id);

      const book = dbBookData.get({ plain: true });
      console.log(book);
      res.render('book', { book, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render('login');
});



router.get("/logout", (req, res) => {
    res.redirect("/api/users/logout");
});


module.exports = router;
