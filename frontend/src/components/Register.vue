<template>
  <div>
    <h1>Đăng Ký</h1>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Họ tên" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Mật khẩu"
        required
      />
      <button type="submit">Đăng Ký</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  })
  if (response.ok) {
    alert('Đăng ký thành công! Bạn có thể đăng nhập.')
    router.push('/login')
  } else {
    alert('Đăng ký không thành công')
  }
}
</script>
