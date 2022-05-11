const router = require('express').Router();

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

router.get("/allposts", (req, res) => {
  res.render("allposts");
});

router.get("/resources", (req, res) => {
  res.render("resources");
});

module.exports = router;