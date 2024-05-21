<template>

  <div class="w-100 d-flex justify-center mt-10" dir="rtl" v-if="transactionStore.transactionLoading">
    <p style="font-weight: bold; font-size: 32px;">در حال دریافت اطلاعات</p>
  </div>
  <div class="pa-10">

    <v-data-table-server

        dir="ltr"
        :loading="transactionStore.transactionLoading"
        :headers="headers"
        :items="transactionStore.transactionData"
        item-value="id"
        :items-length="transactionStore.totalPages"
        @update:options="transactionStore.fetchAllTransactionList"

    ></v-data-table-server>

  </div>

</template>

<script setup>

import {reactive} from "vue";
import {useTransactionStore} from "@/stores/transaction";


const transactionStore = useTransactionStore()

const thousandSep = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

}



const headers = reactive(
    [
      { title: 'شماره', align: 'center', key: 'id' },
      { title: '(T)مبلغ', align: 'center', key: 'amount' },
      { title: 'تاریخ', align: 'center', key: 'created_at' },
      { title: 'مقصد تراکنش', align: 'center', key: 'destination.walletable_type' },
      { title: 'مبدا تراکنش', align: 'center', key: 'source.walletable_type' },
    ]
)





</script>

<style scoped>

</style>