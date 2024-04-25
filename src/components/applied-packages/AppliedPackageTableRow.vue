<template>
  <tr class="bg-white hover:bg-gray-100 transition-all border-b border-gray-200">
    <td
      scope="row"
      :class="[
        'p-4 font-medium whitespace-nowrap ',
        isDisabled ? 'text-gray-400' : 'text-gray-900'
      ]"
    >
      {{ dayjs(data.startedAt).format('DD.MM.YYYY') }}
    </td>
    <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap">
      <span
        :class="[
          'w-[25px] h-[25px] rounded-md flex items-center justify-center ',
          isDisabled ? 'text-gray-400 bg-gray-200' : 'bg-green-100 text-green-700'
        ]"
      >
        {{ data.userName.charAt(0) }}
      </span>
    </td>
    <td
      scope="row"
      :class="[
        'p-4 font-medium whitespace-nowrap ',
        isDisabled ? 'text-gray-400' : 'text-gray-900'
      ]"
    >
      {{ data.packageName }}
    </td>
    <td
      scope="row"
      :class="[
        'p-4 font-medium whitespace-nowrap ',
        Number(data.examination) === Number(data.leftExamination) ||
        dayjs(calculateEndDate()).isBefore(today)
          ? 'text-gray-400'
          : 'text-gray-900'
      ]"
    >
      {{ data.examination + '/' + data.leftExamination }}
    </td>
    <td
      scope="row"
      :class="[
        'p-4 font-medium whitespace-nowrap ',
        Number(data.control) === Number(data.leftControl) ||
        dayjs(calculateEndDate()).isBefore(today)
          ? 'text-gray-400'
          : 'text-gray-900'
      ]"
    >
      {{ data.control + '/' + data.leftControl }}
    </td>
    <td
      scope="row"
      :class="[
        'p-4 font-medium whitespace-nowrap ',
        isDisabled ? 'text-gray-400' : 'text-gray-900'
      ]"
    >
      <div class="relative group">
        <span class="">{{ dayjs(calculateEndDate()).format('DD.MM.YYYY') }}</span>
        <div
          v-if="!isDisabled"
          class="group-hover:flex drop-shadow-2xl hidden min-w-[170px] h-16 absolute top-full mt-2 left-1/2 -translate-x-1/2 rounded bg-white z-10 flex-col gap-1.5 px-3 py-2.5"
        >
          <span class="absolute -top-2 left-1/2 -translate-x-1/2"
            ><svg
              width="18"
              height="8"
              viewBox="0 0 18 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.70711 0.707105L16.7071 7.70711C16.8946 7.89464 17.149 8 17.4142 8L0.585788 8C0.851005 8 1.10536 7.89464 1.29289 7.70711L8.29289 0.707105C8.68342 0.316582 9.31658 0.316581 9.70711 0.707105Z"
                fill="white"
              />
            </svg>
          </span>
          <span class="font-medium text-gray-900 text-sm">Kalan Süre</span>
          <span class="text-gray-500 text-xs"
            >{{ dayjs(calculateEndDate()).diff(data.startedAt, 'day') }} Gün</span
          >
        </div>
      </div>
    </td>
    <td
      scope="row"
      :class="[
        'p-4 truncate max-w-40 font-medium whitespace-nowrap ',
        isDisabled ? 'text-gray-400' : 'text-gray-900'
      ]"
    >
      {{ data.note || '-' }}
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isDisabled ? 'text-gray-400' : 'text-gray-900']"
    >
      {{ data.price + ' ' + data.currency }}
    </td>
    <td
      scope="row"
      :class="['p-4 font-medium whitespace-nowrap', isDisabled ? 'text-gray-400' : 'text-gray-900']"
    >
      -
    </td>
    <td scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap">
      <dropdown-menu
        :key="isDialogOpen || isUpdateDialogOpen || data?.id"
        :overlay="false"
        direction="right"
      >
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
                :disabled="isDisabled"
                @click="handleOpenUpdateDialog"
                class="disabled:text-gray-400 py-2 px-4 hover:text-gray-900 font-medium transition-all"
              >
                Paketi Düzenle
              </button>
            </li>
            <li>
              <button
                :disabled="isDisabled"
                @click="handleOpenDialog"
                class="disabled:text-gray-400 py-2 px-4 hover:text-gray-900 font-medium transition-all"
              >
                Paketi Kullan
              </button>
            </li>
            <li>
              <button
                @click="handleDelete"
                class="py-2 px-4 hover:text-gray-900 font-medium transition-all"
              >
                Paketi Sil
              </button>
            </li>
          </ul>
        </template>
      </dropdown-menu>
    </td>
  </tr>
  <DialogRoot :open="isDialogOpen">
    <PackageUsageForm v-if="isDialogOpen" :closeDialog="handleCloseDialog" :data="data" />
  </DialogRoot>
  <DialogRoot :open="isUpdateDialogOpen">
    <AppliedPackageForm
      mode="update"
      v-if="isUpdateDialogOpen"
      :closeDialog="handleCloseUpdateDialog"
      :data="data"
    />
  </DialogRoot>
</template>
<script setup>
import IconMore from '../icons/IconMore.vue'
import { ref } from 'vue'
import { DialogRoot } from 'radix-vue'
import { toast } from 'vue3-toastify'
import dayjs from 'dayjs'
import { useAppliedPackagesStore } from '@/stores/applied-packages'
import PackageUsageForm from '../package-usages/PackageUsageForm.vue'
import AppliedPackageForm from './AppliedPackageForm.vue'

const props = defineProps(['disabled', 'data'])
const { deleteAppliedPackage } = useAppliedPackagesStore()

function calculateEndDate() {
  let date = dayjs(props.data.startedAt)
  const unit = props.data.durationUnit
  const duration = props.data.duration

  if (unit === 'gün') {
    date = date.add(duration, 'day')
  } else if (unit === 'hafta') {
    date = date.add(duration, 'week')
  } else if (unit === 'ay') {
    date = date.add(duration, 'month')
  } else if (unit === 'yıl') {
    date = date.add(duration, 'year')
  }
  return date
}

const isDialogOpen = ref(false)
const isUpdateDialogOpen = ref(false)

const today = dayjs()

const isDisabled =
  (Number(props.data.leftControl) === Number(props.data.control) &&
    Number(props.data.leftExamination) === Number(props.data.examination)) ||
  dayjs(calculateEndDate()).isBefore(today)

const handleCloseDialog = () => (isDialogOpen.value = false)
const handleOpenDialog = () => (isDialogOpen.value = true)

const handleCloseUpdateDialog = () => (isUpdateDialogOpen.value = false)
const handleOpenUpdateDialog = () => (isUpdateDialogOpen.value = true)

const handleDelete = async () => {
  try {
    await deleteAppliedPackage(props?.data?.id)
    toast.success('Paket silindi.')
  } catch (error) {
    toast.error('Beklenmedik bir hata meydana geldi.')
    return error
  }
}
</script>
