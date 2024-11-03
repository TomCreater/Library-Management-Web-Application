// loanController.js
const db = require("../db");

// Tạo yêu cầu mượn sách
exports.createLoan = async (req, res) => {
  const { book_id, user_id, borrow_date, return_date } = req.body;

  if (!book_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Tất cả các trường đều là bắt buộc." });
  }

  try {
    const loan = await db("loans").insert({
      book_id,
      user_id,
      borrow_date: borrow_date || new Date(),
      return_date: return_date || null,
      status: "pending",
    });

    await db("books").where({ id: book_id }).decrement("available", 1);
    res
      .status(201)
      .json({ message: "Yêu cầu mượn sách đã được tạo", loanId: loan[0] });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo yêu cầu mượn sách" });
  }
};

// Lấy tất cả yêu cầu mượn sách
exports.getLoans = async (req, res) => {
  try {
    const loans = await db("loans")
      .select(
        "loans.id",
        "loans.status",
        "users.name as user_name",
        "books.title as book_title"
      )
      .join("users", "loans.user_id", "users.id")
      .join("books", "loans.book_id", "books.id");

    res.status(200).json(loans);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Lỗi khi lấy danh sách yêu cầu mượn sách" });
  }
};

// Phê duyệt yêu cầu mượn sách
exports.approveLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRows = await db("loans")
      .where({ id })
      .update({ status: "approved" });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu." });
    }

    res.status(200).json({ message: "Yêu cầu mượn sách đã được phê duyệt" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi phê duyệt yêu cầu" });
  }
};

// Từ chối yêu cầu mượn sách
exports.rejectLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRows = await db("loans")
      .where({ id })
      .update({ status: "rejected" });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu." });
    }

    res.status(200).json({ message: "Yêu cầu mượn sách đã bị từ chối" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi từ chối yêu cầu" });
  }
};
