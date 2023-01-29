// console.log("Hello from server");
require('colors');
const dotenv = require('dotenv');
const path = require('path');
const configPath = path.join(__dirname, '..', 'config', '.env');
dotenv.config({ path: configPath });
const express = require('express');
const errorHandler = require('../backend/middlewares/errorHandler');
const { engine } = require('express-handlebars');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));

// set template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'backend/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', require('../backend/routes/filmsRoutes'));

app.use('', require('./routes/authRoutes'));

//register - adding user to the base
//authentification - перевірка даних, що ввів користувач з тою, що є в базі данних
// authorization - перевірка прав доступу

// const userModel = require('./models/users');
// const bcrypt = require('bcryptjs');
// const asyncHandler = require('express-async-handler');
// const jwt = require('jsonwebtoken');
// const auth = require('./middlewares/auth');

// register
// app.post(
//   '/register',
//   asyncHandler(async (req, res) => {
//     // 1. приймаємо данні від користувача
//     const { userEmail, userPassword } = req.body;
//     if (!userEmail || !userPassword) {
//       res.status(400);
//       throw new Error('Email and Password are required');
//     }
//     // 2. перевіряємо чи є такий юзер в базі данних
//     const candidate = await userModel.findOne({ userEmail });
//     // 3. якщо є - кажемо - ти вже існуєш - йди логінься
//     if (candidate) {
//       res.status(400);
//       throw new Error('User already exists');
//     }
//     // 4. хешуєм пароль
//     const hashPassword = bcrypt.hashSync(userPassword, 10);
//     // 5. зберігаємо в базі данних
//     const user = await userModel.create({ ...req.body, userPassword: hashPassword });
//     if (!user) {
//       res.status(400);
//       throw new Error('Unaible to save');
//     }
//     res.status(201).json({
//       code: 201,
//       user,
//     });
//   })
// );

// //login
// app.post(
//   '/login',
//   asyncHandler(async (req, res) => {
//     // 1. Отримуємо данні від користувача,
//     const { userEmail, userPassword } = req.body;
//     if (!userEmail || !userPassword) {
//       res.status(400);
//       throw new Error('Email and Password are required');
//     }
//     // 2. Шукаємо користувача з таким емейлом в базі данних
//     const user = await userModel.findOne({ userEmail });
//     // 3. Якщо нема - користувач не зареєстрований - іди реєструйся
//     if (!user) {
//       res.status(400);
//       throw new Error('You need to register first');
//     }
//     // 4. Розшифровуємо пароль
//     const correctPassword = bcrypt.compareSync(userPassword, user.userPassword);
//     // 5. Якщо неможна розшифрувати пароль і знайти користувача в базі данних - невірний логін або пароль
//     if (!user || !correctPassword) {
//       res.status(400);
//       throw new Error('Invalid login or password');
//     }
//     // 6. Видаємо Токен
//     user.token = generateToken(user._id);
//     const userWithToken = await user.save();
//     if (!userWithToken) {
//       res.status(400);
//       throw new Error('Unable to save token');
//     }
//     res.status(200).json({
//       code: 200,
//       user: { email: user.userEmail, token: user.token },
//     });
//   })
// );

// //logout
// app.get(
//   '/logout',
//   auth,
//   asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     const user = await userModel.findById(_id);

//     if (!user) {
//       res.status(400);
//       throw new Error('Unaible to logout');
//     }

//     user.token = null;
//     await user.save();
//     res.status(200).json('Logout success');
//   })
// );

// const generateToken = id => {
//   let payload = { id };
//   return jwt.sign(payload, 'pizza', { expiresIn: '2h' });
// };

// express-handlebars
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// app.post("/send", (req, res) => {
//   res.send(req.body);
// });
const sendEmail = require('./services/sendEmail');

app.post('/send', async (req, res) => {
  try {
    await sendEmail(req.body);

    res.render('send', {
      msg: 'Email send successfully',
      userName: req.body.userName,
      userEmail: req.body.userEmail,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
  //   next();
});
app.use(errorHandler);

const connectDb = require('../config/db');
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port: ${process.env.PORT}`.bold.blue);
});
