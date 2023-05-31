const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/',(req, res)=>{
    //access user model and run .findAll() mehtod)
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.oog(err);
            res.status(500).json(err);
        });
    });



module.exports = router;