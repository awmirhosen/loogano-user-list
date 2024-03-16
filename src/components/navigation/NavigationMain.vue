<template>

  <v-navigation-drawer v-model="navigationMain" class="pa-2 text-start bg-blue-grey-darken-1
" location="end" dir="rtl">

    <v-list>


      <div class="w-100 d-flex justify-center mb-4">
        <div class="text-center">
          <v-avatar color="blue-grey-darken-2" size="45">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
          <p class="mt-2">مدیریت</p>
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>


      <v-list-item prepend-icon="mdi-home text-center"
                   title="داشبورد"
                   value="dashboard"
                   class="mb-1"
                   :to="{name : 'dashboard'}"/>

                   <v-list-group value="Pages">

<template v-slot:activator="{ props }">
  <v-list-item
      class="mb-1"
      v-bind="props"
      prepend-icon="mdi-account-supervisor"
      title="سرمایه گذاری">
  </v-list-item>
</template>

<v-list-item
    v-for="(menu, index) in subMenusInvestme"
    :key="index"
    :value="menu.keyword"
    :title="menu.title"
    class="mb-1 text-subtitle-1"
    :to="{name : menu.link}"
    :prepend-icon="menu.icon" />

</v-list-group>


                   <v-list-item prepend-icon="mdi-logout text-start"
                   title="خروج"
                   value="exit"
                   class="mb-1"
                   @click="authStore.logout()"
                   />

    </v-list>

  </v-navigation-drawer>

</template>

<script setup>

import {useThemeStore} from "../../stores/theme" ;
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores"
import { reactive } from "vue";

const authStore = useAuthStore();

/** submenus pages **/
// const subMenusUsers = reactive([
//   {title: "لیست کاربران", keyword: "all-users", icon: null, link: "users"},
// ]);
// const subMenusProjects = reactive([
//   {title: "لیست پروژه ها", keyword: "all-projects", icon: null, link: "countries"},
//   {title: "ساخت پروژه", keyword: "add-project", icon: null, link: "addCountry"},
// ]);

const subMenusInvestme = reactive([
  {title: "سرمایه گذار ها", keyword: "investment-users", icon: null, link: "investment-users"},
]);


/** theme store **/
const themeStore = useThemeStore();

/** navigationMain status  **/
const {navigationMain} = storeToRefs(themeStore);

</script>

<style scoped>

.v-list-item__content {
  text-align: right !important;
}

</style>