import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { LoginView } from '@/views';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', name:"dashboard", component: () => import("../views/HomeView.vue") },
        { path: '/login', name:'login', component: () => import("../views/LoginView.vue") },
        ////// investment
        {
           path: "/investment/users",
           name: "investment-users",
           component: () => import("../views/investment/InvestmentUsers.vue")
        },
        ////// transactions
        {
            path: "/investment/transactions",
            name: "transactions-list",
            component: () => import("../views/transactions/TransctionList.vue")
        }
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});
