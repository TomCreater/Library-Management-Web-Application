const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  // Nếu token có tiền tố "Bearer", loại bỏ nó
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7); // loại bỏ "Bearer " (7 ký tự)
  }

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }

  return res.status(403).json({ message: 'Access denied' });
};
