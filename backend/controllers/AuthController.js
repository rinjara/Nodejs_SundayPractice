const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

class AuthController {
  register = asyncHandler(async (req, res) => {
    // 1. приймаємо данні від користувача
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400);
      throw new Error('Email and Password are required');
    }
    // 2. перевіряємо чи є такий юзер в базі данних
    const candidate = await userModel.findOne({ userEmail });
    // 3. якщо є - кажемо - ти вже існуєш - йди логінься
    if (candidate) {
      res.status(400);
      throw new Error('User already exists');
    }
    // 4. хешуєм пароль
    const hashPassword = bcrypt.hashSync(userPassword, 10);
    // 5. зберігаємо в базі данних
    const user = await userModel.create({ ...req.body, userPassword: hashPassword });
    if (!user) {
      res.status(400);
      throw new Error('Unaible to save');
    }
    res.status(201).json({
      code: 201,
      user,
    });
  });

  login = asyncHandler(async (req, res) => {
    // 1. Отримуємо данні від користувача,
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400);
      throw new Error('Email and Password are required');
    }
    // 2. Шукаємо користувача з таким емейлом в базі данних
    const user = await userModel.findOne({ userEmail });
    // 3. Якщо нема - користувач не зареєстрований - іди реєструйся
    if (!user) {
      res.status(400);
      throw new Error('You need to register first');
    }
    // 4. Розшифровуємо пароль
    const correctPassword = bcrypt.compareSync(userPassword, user.userPassword);
    // 5. Якщо неможна розшифрувати пароль і знайти користувача в базі данних - невірний логін або пароль
    if (!user || !correctPassword) {
      res.status(400);
      throw new Error('Invalid login or password');
    }
    // 6. Видаємо Токен
    user.token = this.generateToken(user._id);
    const userWithToken = await user.save();
    if (!userWithToken) {
      res.status(400);
      throw new Error('Unable to save token');
    }
    res.status(200).json({
      code: 200,
      user: { email: user.userEmail, token: user.token },
    });
  });

  logout = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await userModel.findById(_id);

    if (!user) {
      res.status(400);
      throw new Error('Unaible to logout');
    }

    user.token = null;
    await user.save();
    res.status(200).json('Logout success');
  });

  generateToken = id => {
    let payload = { id };
    return jwt.sign(payload, 'pizza', { expiresIn: '2h' });
  };
}

module.exports = new AuthController();
