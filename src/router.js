import { createRouter, createWebHashHistory } from "vue-router";

import LoginView from "./components/pages/auth/LoginView.vue"
import SignupView from "./components/pages/auth/SignupView.vue";

import DashboardView from "./components/pages/dashboard/DashboardView.vue"
import CreatePostView from "./components/pages/post/CreatePostView.vue"
import PostDetailsView from "./components/pages/post/PostDetailsView.vue"
import RecorderView from "./components/pages/post/RecorderView.vue"

const routes = [
    { path: '/', component: DashboardView },
    { path: '/auth', component: LoginView },
    { path: '/signup', component: SignupView },
    { path: '/post', component: CreatePostView },
    { path: '/post/:postid', component: PostDetailsView },
    { path: '/record', component: RecorderView },
]

const router = createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes, 
})


export default router;