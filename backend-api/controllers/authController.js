// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Đăng ký người dùng
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tất cả các trường đều là bắt buộc.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db('users').insert({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    res.status(201).json({ message: 'Người dùng đã đăng ký thành công', userId: user[0] });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi đăng ký người dùng' });
  }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc.' });
  }

  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.is_admin }, 'your_jwt_secret');
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi đăng nhập người dùng' });
  }
};
