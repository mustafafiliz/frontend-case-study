<template>
  <tr class="bg-white hover:bg-gray-100 transition-all border-b border-gray-200 text-sm">
    <td scope="row" class="p-4 font-medium whitespace-nowrap text-gray-900">
      {{ dayjs(data.usageAt).format('DD.MM.YYYY') }}
    </td>
    <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap">
      {{ data.type === 'control' ? 'Kontrol' : 'Muayene' }}
    </td>
    <td scope="row" class="'p-4 font-medium whitespace-nowrap text-gray-900">
      {{ data.packageName }}
    </td>
    <td scope="row" class="p-4 font-medium whitespace-nowrap">
      <span class="py-2 px-3 rounded-lg bg-green-100 text-green-700 text-xs">{{
        data.userName
      }}</span>
    </td>
    <td scope="row" class="p-4 truncate max-w-40 font-medium whitespace-nowrap">
      {{ data.note || '-' }}
    </td>

    <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap">
      <dropdown-menu :key="data?.id" :overlay="false" direction="right">
        <template #trigger>
          <button
            class="text-gray-500 border border-gray-300 rounded-lg w-6 h-6 flex items-center justify-center"
          >
            <IconMore />
          </button>
        </template>
        <template #body>
          <ul class="py-1 text-gray-700 text-sm">
            <li>
              <button
                @click="handleDelete"
                class="py-2 px-4 hover:text-gray-900 font-medium transition-all"
              >
                Sil
              </button>
            </li>
          </ul>
        </template>
      </dropdown-menu>
    </td>
  </tr>
</template>
<script setup>
import IconMore from '../icons/IconMore.vue'
import dayjs from 'dayjs'
import { usePackageUsagesStore } from '@/stores/package-usages'
import { toast } from 'vue3-toastify'

const props = defineProps(['disabled', 'data'])
const { deletePackageUsage } = usePackageUsagesStore()

const handleDelete = async () => {
  try {
    await deletePackageUsage(props?.data?.id)
    toast.success('Paket hareketi silindi.')
  } catch (error) {
    toast.error('Beklenmedik bir hata meydana geldi.')
    return error
  }
}
</script>
