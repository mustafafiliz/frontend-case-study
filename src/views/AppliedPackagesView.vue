<template>
  <main class="container mx-auto pt-5 lg:pt-10">
    <AppliedPackageListing />
  </main>
</template>
<script setup>
import AppliedPackageListing from '@/components/applied-packages/AppliedPackageListing.vue'
import { useAppliedPackagesStore } from '@/stores/applied-packages'
import { storeToRefs } from 'pinia'

const { getAppliedPackages } = useAppliedPackagesStore()

getAppliedPackages()
</script>
