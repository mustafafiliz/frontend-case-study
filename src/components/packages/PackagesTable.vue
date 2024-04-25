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
        <PackagesTableRow v-for="(item, index) in packages" :key="index" :data="item" />
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
import { usePackagesStore } from '@/stores/packages'
import PackagesTableRow from './PackagesTableRow.vue'
import IconFilter from '../icons/IconFilter.vue'
import Pagination from '../ui/Pagination.vue'

const { packages, totalPage, page, name, _sort } = storeToRefs(usePackagesStore())
const { getPackages, setPage, setSort } = usePackagesStore()

const handlePagination = async (newPage) => {
  setPage(newPage)
  getPackages()
}

const handleFilter = (sort) => {
  const sortBy = _sort.value === sort ? '-' + sort : sort
  setSort(sortBy)
  getPackages()
}

const headers = [
  {
    name: 'PAKET ADI',
    sortable: true,
    sortBy: 'name'
  },
  {
    name: 'UZMANLAR',
    sortable: false,
    sortBy: ''
  },
  {
    name: 'MUAYENE',
    sortable: true,
    sortBy: 'examination'
  },
  {
    name: 'KONTROL',
    sortable: true,
    sortBy: 'control'
  },
  {
    name: 'GEÇERLİLİK',
    sortable: false,
    sortBy: ''
  },
  {
    name: 'HİZMET ÜCRETİ',
    sortable: true,
    sortBy: 'price'
  },
  {
    name: 'PARA BİRİMİ',
    sortable: false,
    sortBy: ''
  },
  {
    name: 'AKTİF PASİF',
    sortable: false,
    sortBy: ''
  }
]
</script>
