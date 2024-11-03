<template>
  <div>
    <h1>Đăng Nhập</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Mật khẩu"
        required
      />
      <button type="submit">Đăng Nhập</button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </form>
    <p>Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue' // Thêm computed vào đây
import { useStore } from 'vuex'

const email = ref('')
const password = ref('')
const store = useStore()

// Sử dụng computed để lấy thông báo lỗi từ state
const errorMessage = computed(() => store.state.errorMessage)

const login = () => {
  store.dispatch('login', { email: email.value, password: password.value })
}
</script>
