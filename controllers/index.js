const router = require('express').Router();

const apiRoutes = require('./api');

const allPostRoutes = require('./allpost-routes.js');

const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/allposts', allPostRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;