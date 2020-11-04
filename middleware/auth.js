const jwt = require('jsonwebtoken');

const auth = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '48h',
    }
  );
};

module.exports = auth;