<template>
  <div class="relative overflow-x-auto pb-28 bg-[#fafafaaf]">
    <table class="w-full text-sm text-left text-gray-500 rounded-b-lg border border-gray-200">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-t border-gray-200">
        <tr>
          <th
            v-for="(item, index) in headers"
            :key="index"
            scope="col"
            class="p-4 whitespace-nowrap"
          >
            <div class="flex items-center gap-1">
              {{ item.name }}
              <button v-if="item.sortable" @click="handleFilter(item.sortBy)">
                <IconFilter :fill="_sort.includes(item.sortBy) ? '#1A56DB' : '#9CA3AF'" />
              </button>
            </div>
          </th>
          <th scope="col" class="p-4 min-w-[50px]"></th>
        </tr>
      </thead>
      <tbody>
        <AppliedPackageTableRow
          v-for="(item, index) in appliedPackages"
          :key="index || item"
          :data="item"
        />
      </tbody>
    </table>
  </div>
  <Pagination
    :totalPage="totalPage"
    :page="page"
    @onPagination="(value) => handlePagination(value)"
  />
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import AppliedPackageTableRow from './AppliedPackageTableRow.vue'
import { useAppliedPackagesStore } from '@/stores/applied-packages'
import Pagination from '../ui/Pagination.vue'
import IconFilter from '../icons/IconFilter.vue'

const { appliedPackages, totalPage, page, _sort } = storeToRefs(useAppliedPackagesStore())
const { setPage, setSort, getAppliedPackages } = useAppliedPackagesStore()

const handlePagination = async (newPage) => {
  setPage(newPage)
  getAppliedPackages()
}

const handleFilter = (sort) => {
  const sortBy = _sort.value === sort ? '-' + sort : sort
  setSort(sortBy)
  getAppliedPackages()
}

const headers = [
  {
    name: 'BAŞLANGIÇ',
    sortable: true,
    sortBy: 'startedAt'
  },
  {
    name: 'UZMAN',
    sortable: false,
    sortBy: 'userName'
  },
  {
    name: 'PAKET ADI',
    sortable: true,
    sortBy: 'packageName'
  },
  {
    name: 'MUAYENE',
    sortable: false,
    sortBy: ''
  },
  {
    name: 'KONTROL',
    sortable: false,
    sortBy: ''
  },
  {
    name: 'BİTİŞ TARİHİ',
    sortable: false,
    sortBy: ''
  },
  {
    name: 'PAKET NOTU',
    sortable: false,
    sortBy: ''
  },
  {
    name: 'LİSTE FİYATI',
    sortable: true,
    sortBy: 'price'
  },
  {
    name: 'UYGULANAN FİYAT',
    sortable: false,
    sortBy: ''
  }
]
</script>
