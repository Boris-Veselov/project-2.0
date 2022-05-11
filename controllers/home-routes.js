const router = require('express').Router();
const { Post, User } = require("../models");

router.get('/', (req, res) => {
  console.log(req.session);
  res.render('home');
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

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
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
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // console.log(dbPostData[0]);
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

router.get('/post/:id', (req, res) => {
  const post = {
    id: 1,
    title: 'Handlebars Docs',
    post_content: 'here is the content',
    user_id: {
      username: 'test_user'
    }
  };

  res.render('single-post', { post });
});

router.get("/resources", (req, res) => {
  res.render("resources");
});

module.exports = router;