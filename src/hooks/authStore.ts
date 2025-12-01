import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/export/exports.ts'
import axios from 'axios'

// Ensure credentials (cookies) are sent with requests
axios.defaults.withCredentials = true

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  async function login(email: string, password: string) {
    const res = await axios.post('http://localhost:8080/auth/authenticate', {
      email,
      password
    });

    user.value = res.data
  }

  async function signup(name: string, email: string, password: string) {
    const res = await axios.post('http://localhost:8080/auth/register', {
      name,
      email,
      password
    });

    console.log(res);
  }

  async function deleteMyAccount() {
    const res = await axios.delete(`http://localhost:8080/auth/delete/${user.value?.id}`)
    console.log(res)
  }

  async function logout() {
    try {
      // 1. Tell backend to kill the cookie
      await axios.post('http://localhost:8080/auth/logout')
    } catch (err) {
      console.error("Logout failed on server, cleaning up client anyway", err)
    } finally {
      user.value = null
    }
  }

  // New function: Check session on page reload
  async function checkAuth() {
    try {
      // Endpoint that returns the user if the cookie is valid
      const res = await axios.get('http://localhost:8080/auth/me')
      user.value = res.data
    } catch (error) {
      user.value = null
    }
  }


  return { user, isAuthenticated, login, logout, signup, checkAuth, deleteMyAccount }
})
