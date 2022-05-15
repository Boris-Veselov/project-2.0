const router = require('express').Router();
const { Post, User } = require("../models");

router.get('/', (req, res) => {
  res.render('home'), {
  loggedIn: req.session.loggedIn
  }
});

router.get('/create_a_post', (req, res) => {
  res.render('create_a_post');
});

router.get('/cat-a-log', (req, res) => {
  res.render('cat-a-log');
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

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

router.get('/singlepost', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_content',
      'title',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbSPostData => {
    if (!dbSPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

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

router.get("/resources", (req, res) => {
  res.render("resources");
});

module.exports = router;