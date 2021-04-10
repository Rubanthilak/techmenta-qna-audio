import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js";
import store from "./store/index.js";
import { firestorePlugin } from 'vuefire'

//Components
import TopBar from "./components/ui/bars/TopBar.vue";
import NavigationBar from "./components/ui/bars/NavigationBar.vue";
import FeedTile from "./components/ui/feed/FeedTile.vue";
import FeedList from "./components/ui/feed/FeedList.vue";

//Pages
import LoginView from "./components/pages/auth/LoginView.vue";
import SignupView from "./components/pages/auth/SignupView.vue";
import CreatePostView from "./components/pages/post/CreatePostView.vue"
import RecorderView from "./components/pages/post/RecorderView.vue"
import PostDetailsView from "./components/pages/post/PostDetailsView.vue"

//Layouts
import MainColumnGrid from "./components/layout/MainColumnGrid";



const app = createApp(App);

app.use(router);
app.use(store);
app.use(firestorePlugin)

//Components
app.component("top-bar",TopBar);
app.component("nav-bar",NavigationBar);
app.component("feed-tile",FeedTile);
app.component("feed-list",FeedList);

//Pages
app.component("login-view",LoginView);
app.component("signup-view",SignupView);
app.component("create-post-view",CreatePostView);
app.component("post-details-view",PostDetailsView);
app.component("recorder-view",RecorderView);

//Layouts
app.component("main-col-grid",MainColumnGrid);


app.mount('#app');
