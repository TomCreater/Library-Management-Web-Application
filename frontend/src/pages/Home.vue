<template>
  <div>
    <h1>Chào Mừng Đến Với Quản Lý Thư Viện</h1>
    <BookList />
    <router-link to="/login">Đăng Nhập</router-link>
    <router-link to="/register">Đăng Ký</router-link>
  </div>
</template>

<script setup>
import BookList from '../components/BookList.vue'
</script>
