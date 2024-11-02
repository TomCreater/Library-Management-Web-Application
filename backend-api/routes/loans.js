const express = require('express');
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Cấu hình multer để xử lý file upload
const upload = multer();

const router = express.Router();

/**
 * @swagger
 * /loans/create:
 *   post:
 *     summary: Tạo yêu cầu mượn sách
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               borrow_date:
 *                 type: string
 *                 format: date
 *               return_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Yêu cầu mượn sách đã được tạo
 *       400:
 *         description: Lỗi khi tạo yêu cầu mượn sách
 */
router.post('/create', authMiddleware.verifyToken, upload.none(), loanController.createLoan);

/**
 * @swagger
 * /loans/requests:
 *   get:
 *     summary: Lấy danh sách tất cả yêu cầu mượn sách
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách yêu cầu mượn sách
 *       400:
 *         description: Lỗi khi lấy danh sách yêu cầu mượn sách
 */
router.get('/requests', authMiddleware.verifyToken, loanController.getLoans);

/**
 * @swagger
 * /loans/approve/{id}:
 *   put:
 *     summary: Phê duyệt yêu cầu mượn sách theo ID
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của yêu cầu mượn sách
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Yêu cầu mượn sách đã được phê duyệt
 *       400:
 *         description: Lỗi khi phê duyệt yêu cầu
 */
router.put('/approve/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, loanController.approveLoan);

/**
 * @swagger
 * /loans/reject/{id}:
 *   put:
 *     summary: Từ chối yêu cầu mượn sách theo ID
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của yêu cầu mượn sách
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Yêu cầu mượn sách đã bị từ chối
 *       400:
 *         description: Lỗi khi từ chối yêu cầu
 */
router.put('/reject/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, loanController.rejectLoan);

module.exports = router;
