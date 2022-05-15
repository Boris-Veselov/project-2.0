const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/singlepost', (req, res) => {
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

module.exports = router;