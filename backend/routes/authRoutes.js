const authRouter = require('express').Router();
const AuthController = require('../controllers/AuthController');
const auth = require('../middlewares/auth');

// register
authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.get('/logout', auth, AuthController.logout);

module.exports = authRouter;
