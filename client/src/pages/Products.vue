<template>
  <div class="container mt-5 mb-5">
    <div v-if="userStore.isAdmin">
      <h2 class="dashboard-title text-center mb-4">Admin Dashboard</h2>
      <div class="d-flex gap-2 justify-content-center mb-4">
        <button
          class="btn add-product-btn"
          @click="router.push({ name: 'AddProduct' })"
        >
          Add Product
        </button>
        <button class="btn order-btn" @click="router.push({ name: 'Orders' })">
          See Orders
        </button>
      </div>

      <table class="table table-bordered table-hover table-container">
        <thead class="table custom-table">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="align-middle" v-for="product in products" :key="product._id">
            <td class="productName-cell text-center">{{ product.name }}</td>
            <td class="description-cell">{{ product.description }}</td>
            <td>Php {{ product.price }}</td>
            <td>{{ product.isActive ? "Available" : "Unavailable" }}</td>
            <td class="action-cell">
              <button
                class="btn btn-sm me-1 update-btn"
                @click="router.push({ name: 'UpdateProduct', params: { id: product._id } })"
              >
                Update
              </button>
              <button
                v-if="product.isActive"
                class="btn btn-danger btn-sm disable-btn"
                @click="archiveProduct(product._id)"
              >
                Disable
              </button>
              <button
                v-else
                class="btn btn-sm activate-btn"
                @click="activateProduct(product._id)"
              >
                Activate
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h2 class="text-center mb-4 product-title">Our Products</h2>

      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>

      <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col" v-for="product in products" :key="product._id">
          <div class="card product-card h-100 shadow-sm">

            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="card-img-top product-img"
            />
            <div class="card-img-placeholder" v-else>
              <span>SOUL</span>
            </div>

            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-center">{{ product.name }}</h5>
              <p class="card-text text-muted flex-grow-1">
                {{ product.description }}
              </p>
              <p class="fw-bold custom-price-text">
                ₱{{ product.price.toLocaleString() }}
              </p>
              <button
                class="btn detail-btn w-100"
                @click="goToProduct(product._id)"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!loading && !error && products.length === 0"
        class="text-center my-5 text-muted"
      >
        <p>No products available at the moment.</p>
      </div>
    </div>
  </div>

  <footer class="home-footer">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <p class="mb-0">
            Copyright © 2026 Sebastian &amp; Andrei. All rights Reserved
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();
const products = ref([]);
const loading = ref(true);
const error = ref("");

const fetchProducts = async () => {
  loading.value = true;
  error.value = "";
  try {
    if (userStore.isAdmin) {
      const res = await api.get("/products/all");
      products.value = res.data;
    } else {
      const res = await api.get("/products/active");
      products.value = res.data;
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load products.";
  } finally {
    loading.value = false;
  }
};

const goToProduct = (id) => {
  router.push({ name: "ProductDetail", params: { id } });
};

const archiveProduct = async (id) => {
  try {
    await api.patch(`/products/${id}/archive`);
    fetchProducts();
  } catch (err) {
    console.error(err);
  }
};

const activateProduct = async (id) => {
  try {
    await api.patch(`/products/${id}/activate`);
    fetchProducts();
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
