//store/index.js
import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    user: null,
    books: [],
    loans: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBooks(state, books) {
      state.books = books
    },
    setLoans(state, loans) {
      state.loans = loans
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        })
        if (response.ok) {
          const data = await response.json()
          if (data && data.user) {
            // Kiểm tra dữ liệu nhận được từ API
            localStorage.setItem('token', data.token)
            commit('setUser', data.user)

            // Kiểm tra quyền của user để điều hướng
            if (data.user.is_admin) {
              router.push('/admin')
            } else {
              router.push('/user')
            }
          } else {
            console.error('Không nhận được dữ liệu người dùng từ API')
            alert('Đăng nhập không thành công')
          }
        } else {
          alert('Đăng nhập không thành công')
        }
      } catch (error) {
        console.error('Lỗi khi gọi API đăng nhập:', error)
      }
    },
    async fetchBooks({ commit }) {
      const response = await fetch('http://localhost:3000/books')
      const data = await response.json()
      commit('setBooks', data)
    },
    async fetchLoans({ commit }) {
      const response = await fetch('http://localhost:3000/loans/requests', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      commit('setLoans', data)
    },
  },
})
