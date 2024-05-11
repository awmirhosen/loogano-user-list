<template>
  
<div class="w-100 d-flex justify-center mt-10" dir="rtl" v-if="investmentStore.userLoading">
  <p style="font-weight: bold; font-size: 32px;">در حال دریافت اطلاعات</p>
</div>
<div class="pa-10" v-else>



    <v-data-table
          
          :headers="headers"
          :items="investmentStore.usersData"
          item-value="name"
          items-per-page="50"
          return-object
        
      ></v-data-table>

</div>
  
</template>
  
  <script setup>
  
  import {reactive} from "vue";
import { useInvestmentStore } from "../../stores/investment";
  
  const headers = reactive(
      [
        { title: 'نام', align: 'center', key: 'name' },
        { title: 'نام خانوادگی', align: 'center', key: 'fName' },
        { title: 'تلفن همراه', align: 'center', key: 'mobile' },
        { title: '(CM)متراژ سرمایه گذاری', align: 'center', key: 'meter' },
        { title: 'نام پروژه', align: 'center', key: 'title' },
        { title: '(T)مبلغ سرمایه گذاری', align: 'center', key: 'tAmount' },
        { title: '(T)مبلغ پرداخت شده', align: 'center', key: 'amount' },
        { title: 'تاریخ سرمایه گذاری', align: 'center', key: 'date' },
        { title: 'موجودی(T)', align: 'center', key: 'wallet' },
        { title: 'شماره کارت', align: 'center', key: 'cardNumber' },
        { title: 'شماره شبا', align: 'center', key: 'sheba' },
      ]
  )
  

  const investmentStore = useInvestmentStore();
  investmentStore.fetchAllProjectInvestmentUsers();


  
  
  </script>
  
  <style scoped>
  
  </style>