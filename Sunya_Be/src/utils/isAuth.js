const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
 console.log(authorization)
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    //const token = authorization // utilizo para peticion en thunder
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decode) => {
      if (error) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
