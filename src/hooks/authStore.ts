import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/export/exports.ts'
import axios from 'axios'

// Ensure credentials (cookies) are sent with requests
axios.defaults.withCredentials = true

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const hasCheckAuth = ref(false)

  async function login(email: string, password: string) {
    const res = await axios.post('http://localhost:8080/auth/authenticate', {
      email,
      password
    })
    user.value = res.data
  }

  async function signup(name: string, email: string, password: string) {
    await axios.post('http://localhost:8080/auth/register', {
      name,
      email,
      password
    })
  }

  async function deleteMyAccount() {
    await axios.delete(`http://localhost:8080/auth/delete/${user.value?.id}`, {
      withCredentials: true
    })
    user.value = null
  }

  async function logout() {
    try {
      await axios.post('http://localhost:8080/auth/logout')
    } finally {
      user.value = null
    }
  }

  async function checkAuth() {
    try {
      const res = await axios.get('http://localhost:8080/auth/me', {
        withCredentials: true
      })
      user.value = res.data
    } catch {
      user.value = null
    } finally {
      hasCheckAuth.value = true
    }
  }

  return {
    user,
    isAuthenticated,
    hasCheckAuth,
    login,
    logout,
    signup,
    deleteMyAccount,
    checkAuth
  }
})

