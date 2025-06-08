import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSplide from '@splidejs/vue-splide';
import './styles/main.scss';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {createPinia} from "pinia";

gsap.registerPlugin(ScrollTrigger,SplitText);
const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$gsap = gsap
app.use(router)
app.use(pinia)
app.use(VueSplide)

app.mount('#app')
