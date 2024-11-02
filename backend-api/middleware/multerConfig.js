// middleware/multerConfig.js
const multer = require('multer');

// Cấu hình lưu tệp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu trữ tệp tải lên
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Đặt tên tệp
  }
});

// Khởi tạo multer với cấu hình
const upload = multer({ storage: storage });

module.exports = upload;
