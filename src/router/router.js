// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue'
import Portfolio from "@/components/Portfolio.vue";
import Contact from "@/components/Contact.vue";

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/Portfolio',
        component: Portfolio
    },
    {
        path: '/Contact',
        component: Contact
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;