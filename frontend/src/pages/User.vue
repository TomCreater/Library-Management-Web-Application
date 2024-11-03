<template>
  <div>
    <h1>Người Dùng</h1>
    <input v-model="searchQuery" placeholder="Tìm kiếm sách..." />
    <BookList :isAdmin="false" :books="filteredBooks" @borrow="borrowBook" />
    <h2>Yêu Cầu Mượn Sách</h2>
    <LoanRequests :isAdmin="false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BookList from '../components/BookList.vue'
import LoanRequests from '../components/LoanRequests.vue'

const store = useStore()
const searchQuery = ref('')

// Chỉ lấy sách một lần khi component được mount
onMounted(() => {
  store.dispatch('fetchBooks')
})

// Tạo danh sách sách đã lọc dựa trên `searchQuery`
const filteredBooks = computed(() => {
  return store.state.books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Hàm mượn sách
const borrowBook = async bookId => {
  try {
    const response = await fetch(`http://localhost:3000/loans/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ book_id: bookId, user_id: store.state.user.id }),
    })

    if (response.ok) {
      alert('Yêu cầu mượn sách đã được gửi')
    } else {
      const data = await response.json()
      alert(
        `Gửi yêu cầu không thành công: ${data.message || 'Lỗi không xác định'}`,
      )
    }
  } catch (error) {
    alert('Đã xảy ra lỗi khi gửi yêu cầu mượn sách')
  }
}
</script>
