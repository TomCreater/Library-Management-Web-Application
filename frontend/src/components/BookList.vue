<template>
  <div>
    <h1>Danh Sách Sách</h1>
    <table>
      <thead>
        <tr>
          <th>Tiêu Đề</th>
          <th>Tác Giả</th>
          <th>Thể Loại</th>
          <th>Số Lượng</th>
          <th>Còn Lại</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.category }}</td>
          <td>{{ book.quantity }}</td>
          <td>{{ book.available }}</td>
          <td>
            <button v-if="!isAdmin" @click="$emit('borrow', book.id)">
              Mượn Sách
            </button>
            <button
              v-if="isAdmin"
              @click="$emit('edit', book.id)"
              class="btn btn-warning"
            >
              Sửa
            </button>
            <button
              v-if="isAdmin"
              @click="$emit('delete', book.id)"
              class="btn btn-danger"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  books: {
    type: Array,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const editBook = bookId => {
  // Emit sự kiện để chỉnh sửa sách (nếu cần)
  this.$emit('edit', bookId)
}

const deleteBook = bookId => {
  // Emit sự kiện để xóa sách (nếu cần)
  this.$emit('delete', bookId)
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
