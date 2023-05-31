const router = require('express').Router();

const User = require('./User');
const Post = require('./Post');

router.use('/users', userRoutes);

//conenct routes

module.exports = router;