const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userLoginData = [
    {
        username: 'boris_veselov',
        email: 'borisveselov@yahoo.com',
        password: '12345q'
    }
]

const seedUsers = () => User.bulkCreate(userLoginData, {individualHooks: true});




module.exports = seedUsers;