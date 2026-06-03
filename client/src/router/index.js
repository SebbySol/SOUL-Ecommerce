import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Products from '../pages/Products.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import AddProduct from '../pages/AddProduct.vue'
import About from '../pages/About.vue'
import UpdateProduct from '../pages/UpdateProduct.vue'
import Orders from '../pages/Orders.vue'
import Cart from '../pages/Cart.vue'
import { useUserStore } from '../stores/user'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/products', name: 'Products', component: Products },
    { path: '/about', name: 'About', component: About },
    { path: '/products/add', name: 'AddProduct', component: AddProduct },
    { path: '/products/:id/update', name: 'UpdateProduct', component: UpdateProduct },
    { path: '/products/:id', name: 'ProductDetail', component: ProductDetail },
    { path: '/orders', name: 'Orders', component: Orders },         
    { path: '/cart', name: 'Cart', component: Cart }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.meta.guestOnly && userStore.isAuthenticated) {
        return next({ name: 'Products' })
    }
    next()
})

export default router