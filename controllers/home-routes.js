const router = require('express').Router();
const { Post, User } = require("../models");

//Render home page
router.get('/', (req, res) => {
  res.render("home", {
    loggedIn: req.session.loggedIn,
  });
});

//Render create a post page
router.get('/create_a_post', (req, res) => {
  res.render("create_a_post", {
    loggedIn: req.session.loggedIn,
  });
});

//Render cat-a-log page
router.get('/cat-a-log', (req, res) => {
  res.render("cat-a-log", {
    loggedIn: req.session.loggedIn,
  });
});

//Render login page if user is not logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

//Render signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render("signup");
});

//Render allposts page
router.get("/allposts", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "post_content",
      "title",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbAPostData) => {
      const posts = dbAPostData.map((post) => post.get({ plain: true }));
      console.log(dbAPostData[0]);
      res.render("allposts", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Render singlepost page for specific post clicked on
router.get('/singlepost/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_content'
    ],
    include: {
      model: User,
      attributes: ['username']
    }
  })
  .then(dbSPostData => {
    if(!dbSPostData) {
      res.status(404).json({message: "Sorry, this post doesn't exist!"});
      return;
    }

    console.log(dbSPostData);
    const singlepost = dbSPostData.get({ plain: true });
    res.render('singlepost', {
      singlepost,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Render resources page
router.get("/resources", (req, res) => {
    res.render("resources", {
      loggedIn: req.session.loggedIn,
    });
});

module.exports = router;