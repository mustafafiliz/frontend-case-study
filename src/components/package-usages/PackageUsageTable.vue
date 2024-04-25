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
        <PackageUsageTableRow v-for="(item, index) in packageUsages" :key="item.id" :data="item" />
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
import { ref } from 'vue'
import PackageUsageTableRow from './PackageUsageTableRow.vue'
import { usePackageUsagesStore } from '@/stores/package-usages'
import { storeToRefs } from 'pinia'
import Pagination from '../ui/Pagination.vue'
import IconFilter from '../icons/IconFilter.vue'

const { packageUsages, totalPage, page, _sort } = storeToRefs(usePackageUsagesStore())
const { getPackageUsages, setPage, setSort } = usePackageUsagesStore()

const handlePagination = async (newPage) => {
  setPage(newPage)
  getPackageUsages()
}

const handleFilter = (sort) => {
  const sortBy = _sort.value === sort ? '-' + sort : sort
  setSort(sortBy)
  getPackageUsages()
}

const headers = [
  {
    name: 'KULLANIM TARİHİ',
    sortable: true,
    sortBy: 'usageAt'
  },
  {
    name: 'PAKET TÜRLERİ',
    sortable: true,
    sortBy: 'type'
  },
  {
    name: 'PAKET ADI',
    sortable: true,
    sortBy: 'packageName'
  },
  {
    name: 'İLGİLİ UZMAN',
    sortable: true,
    sortBy: 'userName'
  },
  {
    name: 'GÖRÜŞME NOTU',
    sortable: true,
    sortBy: 'note'
  }
]
</script>
