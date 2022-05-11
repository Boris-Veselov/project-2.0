const {Post} = require('../models');

/*const postData = [

]*/

const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;