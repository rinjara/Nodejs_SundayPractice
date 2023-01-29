const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res, next) => {
  if (req.method === 'options') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!req.headers.authorization.startsWith('Bearer') || !token) {
      res.status(400);
      throw new Error('No Autorization token provided');
    }

    const { id } = jwt.verify(token, 'pizza');
    const user = await userModel.findById(id).select('-token -userPassword');

    if (!user) {
      res.status(401);
      throw new Error('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized');
  }
});
