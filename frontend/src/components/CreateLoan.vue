<!-- CreateLoan.vue -->
<template>
  <div>
    <h2>Tạo Yêu Cầu Mượn Sách</h2>
    <form @submit.prevent="handleCreateLoan">
      <label>
        ID Sách:
        <input v-model="loanData.book_id" type="number" required />
      </label>
      <label>
        ID Người Dùng:
        <input v-model="loanData.user_id" type="number" required />
      </label>
      <button type="submit">Tạo Yêu Cầu</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { createLoan } from '@/services/loanService'

export default {
  data() {
    return {
      loanData: {
        book_id: '',
        user_id: '',
        borrow_date: null, // Tùy chọn
      },
      message: '',
    }
  },
  methods: {
    async handleCreateLoan() {
      try {
        const response = await createLoan(this.loanData)
        this.message = response.message
      } catch (error) {
        this.message = 'Lỗi khi tạo yêu cầu mượn sách'
      }
    },
  },
}
</script>
