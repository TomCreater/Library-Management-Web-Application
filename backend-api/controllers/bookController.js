// bookController.js
const db = require("../db");

// Thêm sách
exports.addBook = async (req, res) => {
  const { title, author, category, quantity } = req.body;

  if (!title || !author || !quantity) {
    return res.status(400).json({ message: "Tất cả các trường bắt buộc." });
  }

  try {
    const book = await db("books").insert({
      title,
      author,
      category,
      quantity,
      available: quantity,
    });

    res.status(201).json({ message: "Thêm sách thành công", bookId: book[0] });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm sách" });
  }
};

// Lấy danh sách sách
exports.getAllBooks = async (req, res) => {
  try {
    const books = await db("books").select("*");
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi lấy danh sách sách" });
  }
};

// Cập nhật sách
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, quantity } = req.body;

  try {
    const updatedRows = await db("books").where({ id }).update({
      title,
      author,
      category,
      quantity,
      available: quantity,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }

    res.status(200).json({ message: "Cập nhật sách thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật sách" });
  }
};

// Xóa sách
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await db("books").where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }

    res.status(200).json({ message: "Xóa sách thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi xóa sách" });
  }
};
