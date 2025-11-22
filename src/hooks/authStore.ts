import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { User } from '@/export/exports.ts'

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

  async function login(email: string, password: string) {
    const res = await fetch(`http://localhost:8080/auth/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      let errorMessage: string;

      // Attempt to parse a JSON error response from the server
      try {
        const errorData = await res.json();
        // Assuming the server returns a 'message' field on failure
        if (errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = `Login failed. Status: ${res.status}`;
        }
      } catch (e) {
        // If the response is not JSON, use the status text or a generic message
        errorMessage = res.statusText || `Login failed. Status: ${res.status}`;
      }

      throw new Error(errorMessage);
    }

    // This part runs only if res.ok is true (e.g., status 200)
    const data: { jwtToken: string, user: User } = await res.json()
    setToken(data.jwtToken)

    user.value = data.user

  }

  async function signup(name: string, email: string, password: string) {
    try {
      const res = await axios.post(
        'http://localhost:8080/auth/register',
        { name, email, password }
      )
      return res.data
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || err.message)
    }
  }

  async function logout() {
    removeToken()
    user.value = null
  }

  return { token, user, isAuthenticated, login, signup, logout }
})
