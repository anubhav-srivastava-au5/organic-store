const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
          return res.status(401).send({ message: 'Invalid Token' });
        }
        req.user = decode;
        next();
        return;
      });
    } else {
      return res.status(401).send({ message: 'Token is not supplied.' });
    }
  };

module.exports=isAuth;