<template>
  <tr class="bg-white hover:bg-gray-100 transition-all border-b border-gray-200">
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isChecked ? 'text-gray-900' : 'text-gray-300']"
    >
      {{ data.name }}
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium text-gray-900 whitespace-nowrap', isChecked ? '' : 'opacity-30']"
    >
      <div class="flex -space-x-2">
        <img
          v-for="(user, index) in data.userIds.slice(0, 3)"
          :key="index"
          class="inline-block size-8 rounded-full ring-2 ring-white"
          :src="user.photoUr"
          alt="Image Description"
        />

        <span
          v-if="data.userIds?.length > 3"
          class="inline-flex items-center justify-center size-8 text-xs rounded-full ring-2 ring-white bg-gray-900 text-white"
          >+{{ data.userIds?.length - 3 }}</span
        >
      </div>
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isChecked ? 'text-gray-900' : 'text-gray-300']"
    >
      {{ data.examination }}
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isChecked ? 'text-gray-900' : 'text-gray-300']"
    >
      {{ data.control }}
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isChecked ? 'text-gray-900' : 'text-gray-300']"
    >
      {{ data.duration + ' ' + data.durationUnit }}
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isChecked ? 'text-gray-900' : 'text-gray-300']"
    >
      {{ data.price }}
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isChecked ? 'text-gray-900' : 'text-gray-300']"
    >
      {{ data.currency }}
    </td>
    <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap">
      <Toggle :checked="isChecked" :onToggle="handleStatusChange" />
    </td>
    <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap">
      <dropdown-menu :key="isDialogOpen || data?.id" :overlay="false" direction="right">
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
                @click="handleOpenDialog"
                class="py-2 px-4 hover:text-gray-900 transition-all"
              >
                Paketi Düzenle
              </button>
            </li>
            <li>
              <button @click="handleDelete" class="py-2 px-4 hover:text-gray-900 transition-all">
                Paketi Sil
              </button>
            </li>
          </ul>
        </template>
      </dropdown-menu>
    </td>
  </tr>
  <DialogRoot :open="isDialogOpen">
    <PackageForm v-if="isDialogOpen" :closeDialog="handleCloseDialog" mode="update" :data="data" />
  </DialogRoot>
</template>
<script setup>
import IconMore from '../icons/IconMore.vue'
import { ref } from 'vue'
import { usePackagesStore } from '@/stores/packages'
import { DialogRoot } from 'radix-vue'
import PackageForm from './PackageForm.vue'
import { toast } from 'vue3-toastify'
import Toggle from '../ui/Toggle.vue'

const props = defineProps(['disabled', 'data'])
const { deletePackage, changeStatus } = usePackagesStore()

const isDialogOpen = ref(false)

const isChecked = ref(props.data.status === 1)

const handleStatusChange = () => {
  isChecked.value = !isChecked.value
  changeStatus(props.data.id)
}

const handleCloseDialog = () => (isDialogOpen.value = false)
const handleOpenDialog = () => (isDialogOpen.value = true)

const handleDelete = async () => {
  try {
    await deletePackage(props?.data?.id)
    toast.success('Paket silindi.')
  } catch (error) {
    toast.error('Beklenmedik bir hata meydana geldi.')
    return error
  }
}
</script>
