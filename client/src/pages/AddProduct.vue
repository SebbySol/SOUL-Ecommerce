<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="text-center mb-4">Add Product</h2>
                <div class="card p-4">
                    <div class="mb-3">
                        <label>Name:</label>
                        <input type="text" class="form-control" v-model="name" placeholder="Enter product name" />
                    </div>
                    <div class="mb-3">
                        <label>Description:</label>
                        <textarea class="form-control" v-model="description" placeholder="Enter product description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label>Price:</label>
                        <input type="number" class="form-control" v-model="price" placeholder="Enter product price" />
                    </div>
                    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                    <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
                    <button class="btn btn-primary w-100" @click="addProduct">Add Product</button>
                    <button class="btn btn-secondary w-100 mt-2" @click="router.push({ name: 'Products' })">Back</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const name = ref('')
const description = ref('')
const price = ref('')
const errorMsg = ref('')
const successMsg = ref('')

const addProduct = async () => {
    errorMsg.value = ''
    successMsg.value = ''

    if (!name.value || !description.value || !price.value) {
        errorMsg.value = 'All fields are required.'
        return
    }

    try {
        await api.post('/products', {
            name: name.value,
            description: description.value,
            price: price.value
        })
        successMsg.value = 'Product added successfully.'
        name.value = ''
        description.value = ''
        price.value = ''
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to add product.'
    }
}
</script>