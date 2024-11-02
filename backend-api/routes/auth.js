const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');
const router = express.Router();

// Khởi tạo multer
const upload = multer(); // Có thể cấu hình thêm nếu cần

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Người dùng đã đăng ký thành công
 *       400:
 *         description: Lỗi khi đăng ký người dùng
 */
router.post('/register', upload.none(), authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Người dùng đã đăng nhập thành công
 *       404:
 *         description: Không tìm thấy người dùng
 *       401:
 *         description: Thông tin đăng nhập không hợp lệ
 */
router.post('/login', upload.none(), authController.login);

module.exports = router;
