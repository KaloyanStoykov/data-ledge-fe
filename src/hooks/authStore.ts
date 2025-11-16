import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  username: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))

  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function removeToken() {
    token.value = null
    localStorage.removeItem('token')
  }

  async function login(username: string, password: string) {
    const res = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    const data: { token: string, user: User } = await res.json()
    setToken(data.token)

    user.value = data.user
  }

  async function logout() {
    removeToken()
    user.value = null
  }

  return { token, user, isAuthenticated, login, logout }
})
