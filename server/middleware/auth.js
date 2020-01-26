const jwt = require('jsonwebtoken');
function auth (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('User is not authorized.');

  try {
    const decoded = jwt.verify(token, 'giantview_jwt');
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = {auth}
