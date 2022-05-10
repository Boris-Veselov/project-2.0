const router = require('express').Router();

router.get('/singlepost', (req, res) => {
    res.render('singlepost');
  });

module.exports = router;