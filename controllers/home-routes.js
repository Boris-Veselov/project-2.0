const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/create_a_post', (req, res) => {
  res.render('create_a_post');
});

module.exports = router;