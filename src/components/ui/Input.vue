<template>
  <div
    class="relative h-[37px] border border-gray-300 text-gray-500 placeholder:text-gray-500 text-sm rounded-lg overflow-hidden"
  >
    <span class="absolute top-1/2 left-2.5 -translate-y-1/2 flex items-center"
      ><slot name="icon"
    /></span>
    <input
      :disabled="disabled"
      :min="min"
      :type="type"
      :required="required"
      :value="value"
      @input="handleChange"
      :class="[
        'px-2.5',
        'h-[37px] disabled:cursor-not-allowed placeholder:text-xs bg-gray-100 w-full',
        inputClass || ''
      ]"
      :placeholder="placeholder"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps([
  'placeholder',
  'icon',
  'inputClass',
  'value',
  'onChange',
  'required',
  'type',
  'min',
  'disabled'
])
const emits = defineEmits(['change'])

const handleChange = (event) => {
  emits('change', event.target.value)
}
</script>
