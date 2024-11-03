<template>
  <div>
    <h1>Yêu Cầu Mượn Sách</h1>
    <ul>
      <li v-for="loan in loans" :key="loan.id">
        <p>
          Người mượn: {{ loan.user_name }} - Sách: {{ loan.book_title }} - Trạng
          thái: {{ loan.status }}
        </p>
        <button
          v-if="isAdmin && loan.status === 'pending'"
          @click="approveLoan(loan.id)"
        >
          Đồng Ý
        </button>
        <button
          v-if="isAdmin && loan.status === 'pending'"
          @click="rejectLoan(loan.id)"
        >
          Từ Chối
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const loans = computed(() => store.state.loans)
const isAdmin = computed(() => store.state.user?.is_admin) // Kiểm tra nếu người dùng là admin

const fetchLoans = async () => {
  await store.dispatch('fetchLoans') // Gọi action để lấy danh sách yêu cầu mượn sách
}

const approveLoan = async loanId => {
  try {
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
      await store.dispatch('fetchLoans')
      alert('Yêu cầu mượn sách đã được phê duyệt')
    } else {
      alert('Lỗi khi phê duyệt yêu cầu')
    }
  } catch (error) {
    console.error('Error approving loan:', error)
    alert('Lỗi khi phê duyệt yêu cầu. Vui lòng thử lại.')
  }
}

const rejectLoan = async loanId => {
  try {
    const response = await fetch(
      `http://localhost:3000/loans/reject/${loanId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )

    if (response.ok) {
      await store.dispatch('fetchLoans')
      alert('Yêu cầu mượn sách đã bị từ chối')
    } else {
      alert('Lỗi khi từ chối yêu cầu')
    }
  } catch (error) {
    console.error('Error rejecting loan:', error)
    alert('Lỗi khi từ chối yêu cầu. Vui lòng thử lại.')
  }
}

onMounted(fetchLoans) // Gọi hàm khi component được khởi tạo
</script>
