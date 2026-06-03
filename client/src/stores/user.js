import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const token = ref(localStorage.getItem('token') || null)
    const isAdmin = ref(JSON.parse(localStorage.getItem('isAdmin')) || false)

    const setUser = (newToken, adminStatus) => {
        token.value = newToken
        isAdmin.value = adminStatus
        localStorage.setItem('token', newToken)
        localStorage.setItem('isAdmin', JSON.stringify(adminStatus))
    }

    const clearUser = () => {
        token.value = null
        isAdmin.value = false
        localStorage.removeItem('token')
        localStorage.removeItem('isAdmin')
    }

    const isAuthenticated = () => !!token.value

    return { token, isAdmin, setUser, clearUser, isAuthenticated }
})