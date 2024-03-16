<template>

<v-app>
      <v-main class="back-cus" dir="rtl">
        <router-view></router-view>
      </v-main>
      <NavigationMain />
</v-app>

    <!-- <div class="app-container bg-light">
        <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
                <a @click="authStore.logout()" class="nav-item nav-link">Logout</a>
            </div>
        </nav>
        <div class="container pt-4 pb-4">
            <RouterView />
        </div>
    </div> -->
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

import { useAuthStore } from '@/stores';
import NavigationMain from './components/navigation/NavigationMain.vue';

const authStore = useAuthStore();
</script>

<style>
@import '@/assets/base.css';
</style>