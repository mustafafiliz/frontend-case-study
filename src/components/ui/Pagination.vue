<template>
  <div class="flex justify-end bg-[#fafafaaf] -mt-24 relative z-10">
    <nav>
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            :disabled="page === 1"
            @click="() => handlePagination(page - 1)"
            class="disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <IconPrev />
          </button>
        </li>
        <li v-for="(_page, index) in totalPage" :key="index">
          <button
            :disabled="page === _page"
            @click="() => handlePagination(_page)"
            :class="[
              'disabled:cursor-not-allowed flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
              page === _page ? 'bg-gray-100' : 'bg-white'
            ]"
          >
            {{ _page }}
          </button>
        </li>
        <li>
          <button
            :disabled="totalPage === page"
            @click="() => handlePagination(page + 1)"
            class="disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <IconNext />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import IconNext from '../icons/IconNext.vue'
import IconPrev from '../icons/IconPrev.vue'
const props = defineProps(['totalPage', 'page'])
const emits = defineEmits(['onPagination'])

const handlePagination = (value) => {
  emits('onPagination', value)
}
</script>
