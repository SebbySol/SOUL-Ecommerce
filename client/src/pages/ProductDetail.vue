<template>
    <div class="detail-page">

        <!-- Loading -->
        <div v-if="loading" class="detail-loading">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="container">
            <div class="alert alert-danger mt-5">{{ error }}</div>
        </div>

        <!-- Product -->
        <div v-else-if="product" class="detail-layout">

            <!-- Left: Image panel -->
            <div class="detail-image-panel">
                <div class="detail-image-placeholder">
                    <img
                        v-if="product.image"
                        :src="product.image"
                        :alt="product.name"
                        class="detail-image"
                    />
                    <span v-else class="detail-image-label">SOUL</span>
                </div>
                <button class="detail-back" @click="router.push({ name: 'Products' })">
                    ← Back to Products
                </button>
            </div>

            <!-- Right: Info -->
            <div class="detail-info-panel">

                <p class="detail-category">Footwear</p>
                <h1 class="detail-name">{{ product.name }}</h1>
                <p class="detail-price">₱{{ product.price.toLocaleString() }}</p>

                <div class="detail-divider"></div>

                <p class="detail-description">{{ product.description }}</p>

                <div class="detail-divider"></div>

                <!-- Cart controls (logged in, non-admin) -->
                <div v-if="userStore.isAuthenticated() && !userStore.isAdmin" class="detail-cart">
                    <p class="detail-qty-label">Quantity</p>
                    <div class="detail-qty-row">
                        <button class="qty-btn" @click="decreaseQty">−</button>
                        <span class="qty-value">{{ quantity }}</span>
                        <button class="qty-btn" @click="increaseQty">+</button>
                    </div>

                    <button class="detail-add-btn" @click="addToCart">
                        {{ addedMsg ? '✔ Added to Cart' : 'Add to Cart' }}
                    </button>
                </div>

                <!-- Not logged in prompt -->
                <div v-else-if="!userStore.isAuthenticated()" class="detail-login-prompt">
                    <p>Please <RouterLink :to="{ name: 'Login' }" class="detail-login-link">log in</RouterLink> to add items to your cart.</p>
                </div>

            </div>

        </div>

        <footer class="detail-footer">
            <p class="mb-0">Copyright © 2026 Sebastian &amp; Andrei. All rights Reserved</p>
        </footer>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const product = ref(null)
const loading = ref(true)
const error = ref('')
const quantity = ref(1)
const addedMsg = ref(false)

const fetchProduct = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await api.get(`/products/${route.params.id}`)
        product.value = res.data
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load product.'
    } finally {
        loading.value = false
    }
}

const increaseQty = () => quantity.value++
const decreaseQty = () => { if (quantity.value > 1) quantity.value-- }

const addToCart = async () => {
    try {
        await api.post('/cart/add-to-cart', {
            productId: product.value._id,
            quantity: quantity.value,
            price: product.value.price
        })
        addedMsg.value = true
        setTimeout(() => addedMsg.value = false, 3000)
    } catch (err) {
        console.error(err)
    }
}

onMounted(() => fetchProduct())
</script>

<style scoped>
    .detail-page {
        min-height: 100vh;
        background: #f8f8f8;
        display: flex;
        flex-direction: column;
        font-family: 'Inter', sans-serif;
    }

    /* Loading */
    .detail-loading {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
    }

    /* Two-column layout */
    .detail-layout {
        flex: 1;
        display: flex;
        min-height: calc(100vh - 80px - 60px);
    }

    /* Left panel */
    .detail-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
    }

    .detail-image-panel {
        width: 50%;
        background: #111;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        position: relative;
        min-height: 500px;
    }

    .detail-image-placeholder {
        width: 100%;
        max-width: 380px;
        aspect-ratio: 4/3;
        background: #1c1c1c;
        border: 1px solid #2a2a2a;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .detail-image-label {
        font-size: 4rem;
        font-weight: 900;
        color: #2a2a2a;
        letter-spacing: -2px;
    }

    .detail-back {
        position: absolute;
        bottom: 2rem;
        left: 3rem;
        background: none;
        border: none;
        color: #888;
        font-size: 0.82rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: color 0.2s;
        padding: 0;
    }

    .detail-back:hover {
        color: #fff;
    }

    /* Right panel */
    .detail-info-panel {
        width: 50%;
        background: #ffffff;
        padding: 4rem 3.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .detail-category {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #009124;
        margin-bottom: 0.75rem;
    }

    .detail-name {
        font-size: clamp(1.8rem, 3vw, 2.8rem);
        font-weight: 800;
        color: #111;
        line-height: 1.1;
        margin-bottom: 1rem;
        letter-spacing: -0.5px;
    }

    .detail-price {
        font-size: 1.6rem;
        font-weight: 700;
        color: #111;
        margin-bottom: 0;
    }

    .detail-divider {
        border-top: 1px solid #e5e5e5;
        margin: 1.5rem 0;
    }

    .detail-description {
        font-size: 0.92rem;
        color: #555;
        line-height: 1.8;
    }

    /* Cart */
    .detail-cart { margin-top: 0.5rem; }

    .detail-qty-label {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #aaa;
        margin-bottom: 0.75rem;
    }

    .detail-qty-row {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        margin-bottom: 1.5rem;
    }

    .qty-btn {
        width: 38px;
        height: 38px;
        border: 1.5px solid #ddd;
        background: #fff;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        color: #111;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.2s, background 0.2s;
    }

    .qty-btn:hover {
        border-color: #111;
        background: #111;
        color: #fff;
    }

    .qty-value {
        font-size: 1.1rem;
        font-weight: 700;
        color: #111;
        min-width: 24px;
        text-align: center;
    }

    .detail-add-btn {
        width: 100%;
        padding: 1rem;
        background: #009124;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .detail-add-btn:hover {
        background: #00751c;
    }

    /* Login prompt */
    .detail-login-prompt {
        font-size: 0.88rem;
        color: #888;
    }

    .detail-login-link {
        color: #009124;
        font-weight: 600;
        text-decoration: none;
    }

    .detail-login-link:hover {
        text-decoration: underline;
    }

    /* Footer */
    .detail-footer {
        background: #111;
        color: #888;
        text-align: center;
        padding: 1.25rem;
        font-size: 0.82rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .detail-layout {
            flex-direction: column;
        }

        .detail-image-panel,
        .detail-info-panel {
            width: 100%;
        }

        .detail-image-panel {
            min-height: 280px;
            padding: 2rem;
        }

        .detail-info-panel {
            padding: 2rem 1.5rem;
        }

        .detail-back {
            position: static;
            margin-top: 1.5rem;
        }
    }
</style>