const db = require('../db');

// Thêm sách
exports.addBook = async (req, res) => {
  const { title, author, category, quantity } = req.body;

  if (!title || !author || !quantity) {
    return res.status(400).json({ message: 'Tất cả các trường bắt buộc.' });
  }

  try {
    const book = await db('books').insert({
      title,
      author,
      category,
      quantity,
      available: quantity // Số lượng sách khả dụng bằng số lượng nhập vào
    });

    res.status(201).json({ message: 'Thêm sách thành công', bookId: book[0] });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm sách' });
  }
};

// Lấy danh sách sách
exports.getAllBooks = async (req, res) => {
  try {
    const books = await db('books').select('*');
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi lấy danh sách sách' });
  }
};

// Cập nhật sách
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, quantity, available, image } = req.body;

  try {
    const book = await db('books').where({ id }).first();
    if (!book) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }

    await db('books').where({ id }).update({
      title: title || book.title,
      author: author || book.author,
      category: category || book.category,
      quantity: quantity || book.quantity,
      available: available || book.available,
      image: image || book.image,
    });

    res.status(200).json({ message: 'Thông tin sách đã được cập nhật' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật sách' });
  }
};

// Xóa sách
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await db('books').where({ id }).del();
    res.status(200).json({ message: 'Xóa sách thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi xóa sách' });
  }
};
