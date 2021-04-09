import { createRouter, createWebHistory } from "vue-router";

import LoginView from "./components/pages/auth/LoginView.vue"
import DashboardView from "./components/pages/dashboard/DashboardView.vue"
import CreatePostView from "./components/pages/post/CreatePostView.vue"
import RecorderView from "./components/pages/post/RecorderView.vue"

const routes = [
    { path: '/', component: DashboardView },
    { path: '/auth', component: LoginView },
    { path: '/post', component: CreatePostView },
    { path: '/record', component: RecorderView },
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})


export default router;