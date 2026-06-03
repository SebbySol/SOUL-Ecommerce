<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Orders</h2>

        <div v-if="loading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else-if="error" class="alert alert-danger text-center">
            {{ error }}
        </div>

        <div v-else-if="orders.length === 0" class="text-center my-5 text-muted">
            <p>No orders found.</p>
        </div>

        <div v-else>
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Ordered On</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order._id">
                        <td>{{ order._id }}</td>
                        <td>{{ order.userId }}</td>
                        <td>₱{{ order.totalPrice.toLocaleString() }}</td>
                        <td>{{ order.status }}</td>
                        <td>{{ new Date(order.orderedOn).toLocaleDateString() }}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-secondary mt-2" @click="router.push({ name: 'Products' })">Back</button>
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const orders = ref([])
const loading = ref(true)
const error = ref('')

const fetchOrders = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await api.get('/orders/all-orders')
        orders.value = res.data
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load orders.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchOrders()
})
</script>