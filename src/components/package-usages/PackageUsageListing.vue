<template>
  <div class="bg-white shadow-[#0000001A] rounded-lg lg:mx-0 mx-3">
    <div
      class="px-[11px] h-[54px] flex items-center justify-between border border-gray-200 border-b-0 rounded-t-lg"
    >
      <h6 class="text-gray-900 text-base leading-6 font-medium">Paket Hareketleri</h6>
    </div>
    <template v-if="packageUsages?.length > 0">
      <PackageUsageTable />
    </template>
    <div v-else class="text-center py-10 text-gray-900 text-sm font-medium border border-gray-200">
      Paket hareketleri bulunamadı.
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import PackageUsageTable from './PackageUsageTable.vue'
import { usePackageUsagesStore } from '@/stores/package-usages'

const { packageUsages } = storeToRefs(usePackageUsagesStore())
</script>
