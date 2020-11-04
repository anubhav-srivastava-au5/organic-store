const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const isAuth = require('../middleware/isAuth');

const User = require('../models/User');


router.put('/update/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: auth(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/login', async (req, res) => {
  const loginUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (loginUser) {
    res.send({
      _id: loginUser.id,
      name: loginUser.name,
      email: loginUser.email,
      isAdmin: loginUser.isAdmin,
      token: auth(loginUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: auth(newUser)
    });
  } else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});





module.exports = router;