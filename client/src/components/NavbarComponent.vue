<template>
    <nav class="navbar navbar-expand-lg custom-navbar">
        <div class="container position-relative d-flex align-items-center">
            
            <a class="navbar-brand" href="/">SO<b>U</b>L</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
    
                <ul class="navbar-nav position-absolute start-50 translate-middle-x d-none d-lg-flex gap-4">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Products' }">Products</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'About' }">About</RouterLink>
                    </li>
                </ul>

                <ul class="navbar-nav d-lg-none mt-2">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Products' }">Products</RouterLink>
                    </li>
                    <template v-if="!userStore.isAuthenticated()">
                        <li class="nav-item mt-2">
                            <RouterLink class="nav-login btn btn-outline-dark w-100" :to="{ name: 'Login' }">Login</RouterLink>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item" v-if="!userStore.isAdmin">
                            <RouterLink class="nav-link" :to="{ name: 'Cart' }">Cart</RouterLink>
                        </li>
                        <li class="nav-item">
                            <a class="nav-logout nav-link" href="#" @click.prevent="logout">Logout</a>
                        </li>
                    </template>
                </ul>

            </div>

            <div class="d-none d-lg-block">
                <ul class="navbar-nav ms-auto">
                    <template v-if="!userStore.isAuthenticated()">
                        <li class="nav-item">
                            <RouterLink class="nav-login btn btn-outline-dark" :to="{ name: 'Login' }">Login</RouterLink>
                        </li>
                    </template>

                    <template v-else>
                        <li class="nav-item" v-if="!userStore.isAdmin">
                            <RouterLink class="nav-link" :to="{ name: 'Cart' }">Cart</RouterLink>
                        </li>
                        <li class="nav-item ms-3">
                            <a class="nav-logout" href="#" @click.prevent="logout">Logout</a>
                        </li>
                    </template>
                </ul>            
            </div>

        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
    userStore.clearUser()
    router.push({ name: 'Login' })
}
</script>