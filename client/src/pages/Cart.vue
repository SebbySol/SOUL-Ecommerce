<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Your Shopping Cart</h2>

        <div v-if="loading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else-if="error" class="alert alert-danger text-center">
            {{ error }}
        </div>

        <div v-else-if="cartItems.length === 0" class="text-center my-5 text-muted">
            <p>Your cart is empty.</p>
        </div>

        <div v-else>
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cartItems" :key="item.productId">
                        <td>{{ item.productName }}</td>
                        <td>₱{{ (item.subTotal / item.quantity).toLocaleString() }}</td>
                        <td>
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-dark btn-sm" @click="decreaseQty(item)">-</button>
                                <span>{{ item.quantity }}</span>
                                <button class="btn btn-dark btn-sm" @click="increaseQty(item)">+</button>
                            </div>
                        </td>
                        <td>₱{{ item.subTotal.toLocaleString() }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click="removeFromCart(item.productId)">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <div class="d-flex gap-2">
                    <button class="btn btn-success" @click="checkout">Checkout</button>
                    <button class="btn btn-danger" @click="clearCart">Clear Cart</button>
                </div>
                <h5>Total: ₱{{ totalPrice.toLocaleString() }}</h5>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const cartItems = ref([])
const totalPrice = ref(0)
const loading = ref(true)
const error = ref('')

const fetchCart = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await api.get('/cart/get-cart')
        const items = res.data.cart?.cartItems || []
        totalPrice.value = res.data.cart?.totalPrice || 0

        const itemsWithNames = await Promise.all(
            items.map(async (item) => {
                const productRes = await api.get(`/products/${item.productId}`)
                return {
                    ...item,
                    productName: productRes.data.name
                }
            })
        )
        cartItems.value = itemsWithNames
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load cart.'
    } finally {
        loading.value = false
    }
}

const increaseQty = async (item) => {
    try {
        await api.patch('/cart/update-cart-quantity', {
            productId: item.productId,
            newQuantity: item.quantity + 1
        })
        fetchCart()
    } catch (err) {
        console.error(err)
    }
}

const decreaseQty = async (item) => {
    if (item.quantity === 1) return
    try {
        await api.patch('/cart/update-cart-quantity', {
            productId: item.productId,
            newQuantity: item.quantity - 1
        })
        fetchCart()
    } catch (err) {
        console.error(err)
    }
}

const removeFromCart = async (productId) => {
    try {
        await api.patch(`/cart/${productId}/remove-from-cart`)
        fetchCart()
    } catch (err) {
        console.error(err)
    }
}

const clearCart = async () => {
    try {
        await api.put('/cart/clear-cart')
        fetchCart()
    } catch (err) {
        console.error(err)
    }
}

const checkout = async () => {
    try {
        await api.post('/orders/checkout')
        router.push({ name: 'Products' })
    } catch (err) {
        console.error(err)
    }
}

onMounted(() => {
    fetchCart()
})
</script>