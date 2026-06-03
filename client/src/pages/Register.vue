<template>
    <div class="container-fluid register-page position-relative d-flex align-items-center justify-content-center register-page-wrapper">

        <div class="bg-png1">
            <img src="/src/assets/bgpng1.png" alt="sweater weather">
        </div>

        <div class="col-11 col-sm-10 col-md-8 col-lg-6">
            <h2 class="text-center register-title">Register</h2>
            <div class="custom-card p-4">

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control shadow-sm" v-model="firstName" placeholder="Enter your First Name" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control shadow-sm" v-model="lastName" placeholder="Enter your Last Name" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control shadow-sm" v-model="email" placeholder="Enter your email" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Mobile Number</label>
                        <input type="text" class="form-control shadow-sm" v-model="mobileNo" placeholder="+(63)-000-000-0000" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control shadow-sm" v-model="password" placeholder="Enter your password" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" class="form-control shadow-sm" v-model="verifyPassword" placeholder="Verify your password" />
                    </div>
                </div>

                <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                <button class="submit-btn btn w-100 font-weight-bold" @click="register">SUBMIT</button>
                <p class="text-center mt-4 account-prompt">
                    Already have an account? <RouterLink :to="{ name: 'Login' }" class="text-success font-weight-bold text-decoration-none fw-bold">Login</RouterLink> here now.
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
import api from '../api'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const mobileNo = ref('')
const password = ref('')
const verifyPassword = ref('')
const errorMsg = ref('')
const router = useRouter()

const register = async () => {
    errorMsg.value = ''

    if (!firstName.value || !lastName.value || !email.value || !mobileNo.value || !password.value || !verifyPassword.value) {
        errorMsg.value = 'All fields are required.'
        return
    }

    if (password.value !== verifyPassword.value) {
        errorMsg.value = 'Passwords do not match.'
        return
    }

    try {
        await api.post('/users/register', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            mobileNo: mobileNo.value,
            password: password.value
        })
        router.push({ name: 'Login' })
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Registration failed.'
    }
}
</script>