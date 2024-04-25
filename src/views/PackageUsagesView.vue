<template>
  <main class="container mx-auto pt-5 lg:pt-10">
    <PackageUsageListing />
  </main>
</template>
<script setup>
import PackageUsageListing from '@/components/package-usages/PackageUsageListing.vue'
import { usePackageUsagesStore } from '@/stores/package-usages'
import { storeToRefs } from 'pinia'

const { getPackageUsages } = usePackageUsagesStore()

getPackageUsages()
</script>
