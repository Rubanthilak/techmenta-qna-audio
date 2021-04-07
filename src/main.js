import { createApp } from 'vue'
import App from './App.vue'

import TopBar from "./components/UI/Bars/TopBar.vue";
import NavigationBar from "./components/UI/Bars/NavigationBar.vue";
import FeedTile from "./components/UI/Feed/FeedTile.vue";

import HomeView from "./components/Pages/HomeView.vue";

import MainColumnGrid from "./components/Layout/MainColumnGrid";

const app = createApp(App);

//Components
app.component("top-bar",TopBar);
app.component("nav-bar",NavigationBar);
app.component("feed-tile",FeedTile);

//Pages
app.component("home-view",HomeView);

//Layouts
app.component("main-col-grid",MainColumnGrid);

app.mount('#app');
