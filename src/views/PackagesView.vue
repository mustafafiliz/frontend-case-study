<template>
  <main class="container mx-auto pt-5 lg:pt-10">
    <PackageListing />
  </main>
</template>
<script setup>
import PackageListing from '@/components/packages/PackageListing.vue'
import { usePackagesStore } from '@/stores/packages'
import { storeToRefs } from 'pinia'

const { getPackages } = usePackagesStore()
getPackages()
</script>
