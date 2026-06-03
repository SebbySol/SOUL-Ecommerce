<template>
    <div class="container-fluid login-page position-relative d-flex align-items-center justify-content-center login-page-wrapper">
        
        <div class="bg-png1">
            <img src="/src/assets/bgpng1.png" alt="sweater weather">
        </div>

        <div class="col-11 col-sm-8 col-md-6 col-lg-4">
            <h2 class="text-center login-title">Login</h2>
            <div class="custom-card p-4">
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control shadow-sm" v-model="email" placeholder="Enter Email" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control shadow-sm" v-model="password" placeholder="Enter Password" />
                </div>
                <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                <button class="submit-btn btn w-100 font-weight-bold" @click="login">SUBMIT</button>
                <p class="text-center mt-4 account-prompt">
                    Don't have an account yet? <RouterLink :to="{ name: 'Register' }" class="text-success font-weight-bold text-decoration-none fw-bold">Register</RouterLink> now.
                </p>
            </div>
        </div>

        <div class="bg-png2">
            <img src="/src/assets/bgpng2.png" alt="shoe lifestyle">
        </div>

    </div>

    <footer class="home-footer">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <p class="mb-0">Copyright © 2026 Sebastian &amp; Andrei. All rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
    
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import api from '../api'
import { jwtDecode } from 'jwt-decode'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
    errorMsg.value = ''
    try {
        const res = await api.post('/users/login', {
            email: email.value,
            password: password.value
        })
        const token = res.data.access
        const decoded = jwtDecode(token)
        userStore.setUser(token, decoded.isAdmin)
        router.push({ name: 'Home' })
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Login failed.'
    }
}
</script>

