<template>
  <div>
    <h2>Thêm Sách</h2>
    <form @submit.prevent="addBook">
      <input v-model="book.title" placeholder="Tiêu Đề Sách" required />
      <input v-model="book.author" placeholder="Tác Giả" required />
      <input v-model="book.category" placeholder="Thể Loại" required />
      <input
        v-model="book.quantity"
        type="number"
        placeholder="Số Lượng"
        required
      />
      <button type="submit">Thêm Sách</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const book = ref({
  title: '',
  author: '',
  category: '',
  quantity: null,
})

const emit = defineEmits()

const addBook = async () => {
  try {
    const response = await fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(book.value),
    })

    if (response.ok) {
      alert('Thêm sách thành công')
      emit('added') // Emit sự kiện để cập nhật danh sách sách trong Admin.vue
      // Reset form
      book.value = { title: '', author: '', category: '', quantity: null }
    } else {
      const errorData = await response.json()
      alert(`Lỗi khi thêm sách: ${errorData.message}`)
    }
  } catch (error) {
    console.error('Error adding book:', error)
    alert('Có lỗi xảy ra')
  }
}
</script>
