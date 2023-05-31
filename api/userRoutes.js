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
//Post /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        twitter: req.body.twitter,
        github: req.body.github
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.twitter = dbUserData.twitter;
            req.session.github = dbUserData.github;
            req.secure.loogedIn = true;

            res.redirect('/dashboard');
        });
    })
    .catch(err => {
        console.log(err)
        res.sender(err)
    });
});


//LOGIN
router.post('/login', (req, res) => {
    console.log("Loggin in...")
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      console.log(dbUserData)
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
      console.log("checking password")
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }

     // res.json({ user: dbUserData, message: 'You are now logged in!' });
      
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.twitter = dbUserData.twitter;
        req.session.github = dbUserData.github;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
      
    })
    .catch(err => {
      console.log(err)
      res.send("ERROR")
    });
  });


  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

module.exports = router;