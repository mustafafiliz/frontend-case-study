<template>
  <button
    :type="type || 'button'"
    @click="onClick"
    class="bg-primary-700 text-white flex items-center gap-1 lg:gap-2 justify-center h-[37px] px-2 lg:px-[13px] text-[11px] lg:text-sm leading-4 lg:leading-[21px] font-medium rounded-lg"
  >
    <template v-if="!loading">
      <slot name="icon" />
      {{ name }}
    </template>
    <template v-else>
      <IconSpinner />
    </template>
  </button>
</template>
<script setup>
import IconSpinner from '../icons/IconSpinner.vue'
const props = defineProps(['name', 'icon', 'onClick', 'type', 'loading'])
</script>
