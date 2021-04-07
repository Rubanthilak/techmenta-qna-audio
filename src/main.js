import { createApp } from 'vue'
import App from './App.vue'

import NavigationBar from "./components/UI/NavigationBar.vue"
import HomeView from "./components/Pages/HomeView.vue"
import MainColumnGrid from "./components/Layout/MainColumnGrid";

const app = createApp(App);

//Components
app.component("nav-bar",NavigationBar);

//Pages
app.component("home-view",HomeView);

//Layouts
app.component("main-col-grid",MainColumnGrid);

app.mount('#app');
