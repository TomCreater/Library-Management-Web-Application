<template>
  <div>
    <h1>Quản Trị Viên</h1>
    <h2>Quản Lý Sách</h2>
    <AddBook @added="fetchBooks" />
    <BookList
      :isAdmin="true"
      @edit="editBook"
      @delete="deleteBook"
      :books="books"
    />

    <h2>Yêu Cầu Mượn Sách</h2>
    <LoanRequests :isAdmin="true" @approve="approveLoan" @reject="rejectLoan" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter
import AddBook from '../components/AddBook.vue'
import BookList from '../components/BookList.vue'
import LoanRequests from '../components/LoanRequests.vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter() // Khai báo router
const books = ref([])

const fetchBooks = async () => {
  await store.dispatch('fetchBooks')
  books.value = store.state.books
}

const editBook = bookId => {
  // Điều hướng đến trang chỉnh sửa sách với thông tin sách
  router.push({ name: 'EditBook', params: { id: bookId } }) // Sử dụng router ở đây
}

const deleteBook = async bookId => {
  const response = await fetch(`http://localhost:3000/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (response.ok) {
    alert('Xóa sách thành công')
    fetchBooks() // Cập nhật lại danh sách sách
  } else {
    alert('Lỗi khi xóa sách')
  }
}

const approveLoan = async loanId => {
  const response = await fetch(
    `http://localhost:3000/loans/approve/${loanId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
  if (response.ok) {
    alert('Yêu cầu mượn sách đã được phê duyệt')
  } else {
    alert('Lỗi khi phê duyệt yêu cầu')
  }
}

const rejectLoan = async loanId => {
  const response = await fetch(`http://localhost:3000/loans/reject/${loanId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if (response.ok) {
    alert('Yêu cầu mượn sách đã bị từ chối')
  } else {
    alert('Lỗi khi từ chối yêu cầu')
  }
}

onMounted(fetchBooks) // Lấy danh sách sách khi component được khởi tạo
</script>
