<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="text-center update-product mb-4">Update Product</h2>
                <div class="card p-4">
                    <div class="mb-3">
                        <label>Name:</label>
                        <input type="text" class="form-control" v-model="name" />
                    </div>
                    <div class="mb-3">
                        <label>Description:</label>
                        <textarea class="form-control" v-model="description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label>Price:</label>
                        <input type="number" class="form-control" v-model="price" />
                    </div>
                    <div class="mb-3">
                        <label>Image URL: <span class="text-muted" style="font-size: 0.85rem;">(optional)</span></label>
                        <input type="text" class="form-control" v-model="image" placeholder="Paste image URL" />
                        <div v-if="image" class="mt-2 text-center">
                            <img :src="image" alt="Preview" class="img-fluid rounded" style="max-height: 200px; object-fit: cover;" />
                        </div>
                    </div>
                    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
                    <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
                    <button class="btn btn-custom-update w-100" @click="updateProduct">Update</button>
                    <button class="btn btn-custom-back w-100 mt-2" @click="router.push({ name: 'Products' })">Back</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../api'

const router = useRouter()
const route = useRoute()

const name = ref('')
const description = ref('')
const price = ref('')
const image = ref('')
const errorMsg = ref('')
const successMsg = ref('')

const fetchProduct = async () => {
    try {
        const res = await api.get(`/products/${route.params.id}`)
        name.value = res.data.name
        description.value = res.data.description
        price.value = res.data.price
        image.value = res.data.image || ''
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to load product.'
    }
}

const updateProduct = async () => {
    errorMsg.value = ''
    successMsg.value = ''

    if (!name.value || !description.value || !price.value) {
        errorMsg.value = 'All fields are required.'
        return
    }

    try {
        await api.patch(`/products/${route.params.id}/update`, {
            name: name.value,
            description: description.value,
            price: price.value,
            image: image.value
        })
        successMsg.value = 'Product updated successfully.'
    } catch (err) {
        errorMsg.value = err.response?.data?.message || 'Failed to update product.'
    }
}

onMounted(() => {
    fetchProduct()
})
</script>

<style scoped>
.update-product {
    font-family: 'Inter', sans-serif;
    color: black;
    font-size: 2rem;
}

.btn-custom-update {
    background-color: #28a745;
    color: white;
    border: none;
}
</style>