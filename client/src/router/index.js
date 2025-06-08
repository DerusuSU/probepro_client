import { createRouter, createWebHistory } from 'vue-router';
import {fetchServiceDetailPage} from "@/api/pages/serviceDetail.js";
import {fetchProjectDetailPage} from "@/api/pages/projectDetail.js";
import {fetchProjectsPage} from "@/api/pages/projects.js";
import {fetchServicesPage} from "@/api/pages/services.js";
import {fetchHomePage} from "@/api/pages/home.js";
import {fetchContactsPage} from "@/api/pages/contacts.js";
import {fetchAboutPage} from "@/api/pages/about.js";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/HomePage.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                const response = await fetchHomePage();
                if (response.status === 'success') {
                    to.meta.homeData = response.data;
                    next();
                } else {
                    next(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке Home:', err);
                next(false);
            }
        },
        meta: { title: 'Главная страница' }
    },
    {
        path: '/services',
        name: 'Services',
        component: () => import('@/pages/ServicesPage.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                const response = await fetchServicesPage();
                if (response.status === 'success') {
                    to.meta.servicesData = response.data;
                    next();
                } else {
                    next(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке Services:', err);
                next(false);
            }
        },
        meta: { title: 'Услуги компании' }
    },
    {
        path: '/services/:slug',
        name: 'ServiceDetail',
        component: () => import('@/pages/ServiceDetailPage.vue'),
        meta: {
            title: 'Услуга',
            serviceData: {},
            guaranteesData: [],
            projectsData: {},
            loadError: null
        },
        beforeEnter: async (to, from, next) => {
            try {
                const slug = to.params.slug;
                const response = await fetchServiceDetailPage(slug);
                console.log('New slug: ', slug)
                console.log('New response: ', response);

                if (response.status === 'success') {
                    // Обновляем мета-данные
                    to.meta.serviceData = response.data.service;
                    to.meta.guaranteesData = response.data.guarantees;
                    to.meta.projectsData = response.data.projects;
                    to.meta.loadError = null;
                    to.meta.title = response.data.service?.title || 'Услуга';
                    next();
                } else {
                    to.meta.loadError = response.message || 'Ошибка загрузки данных';
                    next();
                }
            } catch (err) {
                console.error('Ошибка при загрузке ServiceDetail:', err);
                to.meta.loadError = 'Произошла ошибка при загрузке страницы';
                next();
            }
        },
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import('@/pages/ProjectsPage.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                const response = await fetchProjectsPage();
                if (response.status === 'success') {
                    to.meta.projectsData = response.data;
                    next();
                } else {
                    next(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке Projects:', err);
                next(false);
            }
        },
        meta: { title: 'Проекты' }
    },
    {
        path: '/projects/:slug',
        name: 'ProjectDetail',
        component: () => import('@/pages/ProjectDetailPage.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                const slug = to.params.slug;
                const response = await fetchProjectDetailPage(slug);
                if (response.status === 'success') {
                    to.meta.projectData = response.data;
                    next();
                } else {
                    next(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке ProjectDetail:', err);
                next(false);
            }
        },
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('@/pages/ContactsPage.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                const response = await fetchContactsPage();
                if (response.status === 'success') {
                    to.meta.contactsData = response.data;
                    next();
                } else {
                    next(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке Contacts:', err);
                next(false);
            }
        },
        meta: { title: 'Контакты' }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/AboutPage.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                const response = await fetchAboutPage();
                if (response.status === 'success') {
                    to.meta.aboutData = response.data;
                    next();
                } else {
                    next(false);
                }
            } catch (err) {
                console.error('Ошибка при загрузке About:', err);
                next(false);
            }
        },
        meta: { title: 'О компании' }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    }
});


export default router;
