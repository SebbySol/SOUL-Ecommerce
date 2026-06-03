<template>
  <div class="home">
    <section class="hero">
      <img src="/src/assets/bgpng3.png" class="hero-img-left" alt="" />
      <img src="/src/assets/bgpng3.png" class="hero-img-right" alt="" />

      <div class="container-fluid px-0 hero_container">
        <div class="row g-0 align-items-center justify-content-center">
          <div class="col-12 col-lg-6 text-center hero_content">
            <h1 class="hero_title">
              <span class="hero_title--green">Timeless</span> pieces<br />
              made for everyday <span class="hero_title--green">wear.</span>
            </h1>
            <p class="hero_sub">
              Modern essentials designed for everyday wear.
            </p>
            <RouterLink :to="{ name: 'Products' }" class="hero_btn">
              Shop Now
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="filter-bar">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filter-bar_inner">
              <div class="filter-bar_left">
                <span class="filter-label">Sort by</span>
                <span class="filter-label">Category</span>
                <button
                  v-for="f in filters"
                  :key="f"
                  class="filter-pill"
                  :class="{ 'filter-pill--active': activeFilter === f }"
                  @click="activeFilter = f"
                >
                  {{ f }}
                </button>
              </div>

              <div class="filter-bar_right">
                <span class="filter-label">Page</span>
                <span class="filter-page">1/3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="products-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="products-section_title">Best Selling Products</h2>
          </div>
        </div>

        <div class="row" v-if="loading">
          <div class="col-12 text-center py-5">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading…</span>
            </div>
          </div>
        </div>

        <div class="row" v-else-if="error">
          <div class="col-12">
            <div class="alert alert-danger">{{ error }}</div>
          </div>
        </div>

        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
          v-else
        >
          <div v-for="product in products" :key="product._id" class="col">
            <div class="product-card" @click="goToProduct(product._id)">
              <div class="product-card_img-wrap">
                <img
                  :src="
                    shoeImages[products.indexOf(product) % shoeImages.length]
                  "
                  :alt="product.name"
                  class="product-card_img"
                />
              </div>

              <div class="product-card_info">
                <span class="product-card_category">Shoes</span>
                <p class="product-card_name">{{ product.name }}</p>
                <p class="product-card_price">
                  $ {{ product.price?.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="!loading && !error && products.length === 0">
          <div class="col-12 text-center py-5 text-muted">
            No products available at the moment.
          </div>
        </div>
      </div>
    </section>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

import bgpng1 from "../assets/bgpng1.png";
import bgpng2 from "../assets/bgpng2.png";
import shoe1 from "../assets/shoes/shoe 1.png";
import shoe2 from "../assets/shoes/shoe 2.png";
import shoe3 from "../assets/shoes/shoe 3.png";
import shoe4 from "../assets/shoes/shoe 4.png";
import shoe5 from "../assets/shoes/shoe 5.png";
import shoe6 from "../assets/shoes/shoe 6.png";

const router = useRouter();
const products = ref([]);
const loading = ref(true);
const error = ref("");
const activeFilter = ref("Trending");
const filters = ["Trending", "Price"];
const shoeImages = [shoe1, shoe2, shoe3, shoe4, shoe5, shoe6];

const fetchProducts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const res = await api.get("/products/active");
    products.value = Array.isArray(res.data)
      ? res.data
      : (res.data.products ?? []);
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load products.";
  } finally {
    loading.value = false;
  }
};

const goToProduct = (id) => {
  router.push({ name: "ProductDetail", params: { id } });
};

onMounted(() => {
  fetchProducts();
});
</script>
