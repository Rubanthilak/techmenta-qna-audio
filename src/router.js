import { createRouter, createWebHashHistory } from "vue-router";
import firebase from "./firebase/firebaseConfig";

import LoginView from "./components/pages/auth/LoginView.vue";
import SignupView from "./components/pages/auth/SignupView.vue";

import DashboardView from "./components/pages/dashboard/DashboardView.vue";
import CreatePostView from "./components/pages/post/CreatePostView.vue";
import PostDetailsView from "./components/pages/post/PostDetailsView.vue";

const routes = [
  { path: "/", component: DashboardView, meta: { requireAuth: true } },
  { path: "/auth", component: LoginView, meta: { requireAuth: false } },
  { path: "/signup", component: SignupView, meta: { requireAuth: false } },
  { path: "/post", component: CreatePostView, meta: { requireAuth: true } },
  { path: "/post/:postid",component: PostDetailsView,meta: { requireAuth: true } },
  { path: "/:notFound(.*)", component: DashboardView, meta: { requireAuth: true } },
];

const router = createRouter({
  mode: "history",
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to,from,next) => {
    if(to.meta.requireAuth && !await firebase.getCurrentUser()){
        next('/auth');
    }
    else if(!to.meta.requireAuth && await firebase.getCurrentUser()){
        next('/');
    }
    else{
        next();
    }
});

export default router;
