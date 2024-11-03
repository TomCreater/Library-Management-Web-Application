<template>
  <div>
    <h1>Chỉnh Sửa Sách</h1>
    <form @submit.prevent="updateBook">
      <div>
        <label for="title">Tiêu Đề:</label>
        <input type="text" v-model="book.title" required />
      </div>
      <div>
        <label for="author">Tác Giả:</label>
        <input type="text" v-model="book.author" required />
      </div>
      <div>
        <label for="category">Thể Loại:</label>
        <input type="text" v-model="book.category" />
      </div>
      <div>
        <label for="quantity">Số Lượng:</label>
        <input type="number" v-model="book.quantity" />
      </div>
      <button type="submit">Cập Nhật Sách</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const book = ref({})

const updateBook = async () => {
  const response = await fetch(
    `http://localhost:3000/books/${route.params.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(book.value),
    },
  )
  if (response.ok) {
    alert('Cập nhật sách thành công')
    router.push({ name: 'Admin' }) // Quay lại trang admin sau khi cập nhật
  } else {
    alert('Lỗi khi cập nhật sách')
  }
}

onMounted(() => {
  fetchBook()
})
</script>
