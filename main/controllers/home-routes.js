const router = require('express').Router();
const { Genre, ReadingList, BooksDetails } = require('../models');

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
    // If the user is logged in, allow them to view the genre
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
    // If the user is logged in, allow them to view book details
    try {
      const dbBookData = await BooksDetails.findByPk(req.params.id);

      const book = dbBookData.get({ plain: true });
      
      res.render('book', { book, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


// VIEW Reading list
router.get('/viewReadingList', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to add to reading list
    try {
      const dbReadingList = await ReadingList.findAll({
        where: {user_id: req.session.userID}
      });
      var books=[];
      const list = dbReadingList.map((listItem) =>
      listItem.get({ plain: true })
        );
      console.log(list);
      
      for(var i=0; i<list.length; i++){
        const data = await BooksDetails.findByPk(list[i].book_id);
        const book = data.get({ plain: true });
        console.log(book);
        books.push(book);
        // dbBookData = dbBookData + data ;
      }
      // const dbBookData = dbReadingList.book_id;
      // console.log(dbBookData);
      // const books = dbBookData.map((book) =>
      // book.get({ plain: true })
      // );
      // // const books = dbBookData.get({ plain: true });
      // console.log(books);
      // res.render('readingList', { books, loggedIn: req.session.loggedIn });
      
        console.log(books);
        
        res.render('readingList', { books, loggedIn: req.session.loggedIn });
      }
     catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


// ADD book to Reading list
router.post('/add', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to add to reading list
    try {
      const dbReadingList = await ReadingList.create({
        user_id: req.session.userID,
        book_id: req.body.id
      });

      console.log("book added");
      res.status(200).json(dbReadingList);

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
