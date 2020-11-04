const isAdmin = (req, res, next) => {
  // console.log(req)
  //   console.log(req.user.isAdmin);
   
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'you are not authorised to create product.' });
  };

  
module.exports=isAdmin;