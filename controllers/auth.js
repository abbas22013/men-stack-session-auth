const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user')


// Define a GET route for '/signup'
router.get('/signup', (req, res) => {
    res.render('auth/sign-up.ejs');  // Render the 'sign-up.ejs' template from the 'auth' folder
});

module.exports = router;


router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });
  



  router.post("/sign-up", async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }
    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body)

  res.send(newUser.username);

  router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });
  
  
  router.post("/sign-in", async (req, res) => {
    const password = req.body.password
    const username = req.body.username
  });

if(!userInDatabase) {
    return res.send('login failed. please try again');
}
const validPassword = bcrypt.compareSync(password, userInDatabase.password)

if (!validPassword) {
    return res.send('login failed. please try again');
}
  
req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

  res.redirect('/');
  
  });


 






  
  
  
