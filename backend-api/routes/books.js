// routes/books.js
const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig'); // Import multer config
const router = express.Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Thêm sách mới
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               category:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Thêm sách thành công
 *       400:
 *         description: Lỗi khi thêm sách
 */
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, upload.single('image'), bookController.addBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lấy danh sách tất cả sách
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Danh sách các sách
 *       400:
 *         description: Lỗi khi lấy danh sách sách
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Cập nhật thông tin sách theo ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sách
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               category:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               available:
 *                 type: integer
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin sách đã được cập nhật
 *       400:
 *         description: Lỗi khi cập nhật sách
 *       404:
 *         description: Không tìm thấy sách
 */
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Xóa sách theo ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sách
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa sách thành công
 *       400:
 *         description: Lỗi khi xóa sách
 */
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, bookController.deleteBook);

module.exports = router;
