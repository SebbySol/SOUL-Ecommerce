<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="text-center add-product mb-4">Add Product</h2>
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
                    <div class="mb-3">
                        <label>Image URL:</label>
                        <input type="text" class="form-control" v-model="image" placeholder="Paste image URL" />
                        <div v-if="image" class="mt-2 text-center">
                            <img :src="image" alt="Preview" class="img-fluid rounded" style="max-height: 200px; object-fit: cover;" />
                        </div>
                    </div>
                    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                    <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
                    <button class="btn btn-custom-add w-100" @click="addProduct">Add Product</button>
                    <button class="btn btn-custom-back w-100 mt-2" @click="router.push({ name: 'Products' })">Back</button>
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
const image = ref('')
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
            price: price.value,
            image: image.value
        })
        successMsg.value = 'Product added successfully.'
        name.value = ''
        description.value = ''
        price.value = ''
        image.value = ''
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to add product.'
    }
}
</script>

<style scoped>
.add-product {
    font-family: 'Inter', sans-serif;
    color: black;
    font-size: 2rem;
}

.btn-custom-add {
    background-color: #28a745;
    color: white;
    border: none;
}
</style>