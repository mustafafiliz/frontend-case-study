<template>
  <label class="inline-flex items-center cursor-pointer">
    <input @change="onToggle" type="checkbox" :checked="checked" class="sr-only peer" />
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"
    ></div>
  </label>
</template>

<script setup>
const props = defineProps(['checked', 'onToggle'])
</script>
