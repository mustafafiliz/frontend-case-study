<template>
  <div class="bg-white shadow-[#0000001A] rounded-lg lg:mx-0 mx-3">
    <div
      class="px-[11px] py-2 flex items-center justify-between border border-gray-200 border-b-0 rounded-t-lg"
    >
      <h6 class="text-gray-900 text-base leading-6 font-medium lg:flex hidden">Paketler</h6>
      <div class="flex items-center gap-2.5">
        <Input
          :value="name"
          @change="(e) => handleSearch(e)"
          placeholder="Paket ara"
          inputClass="pl-9"
        >
          <template #icon>
            <IconSearch />
          </template>
        </Input>
        <DialogRoot :open="isDialogOpen">
          <DialogTrigger>
            <Button :onClick="handleOpen" name="Yeni Paket Ekle">
              <template #icon>
                <IconPlus />
              </template>
            </Button>
          </DialogTrigger>
          <PackageForm v-if="isDialogOpen" :closeDialog="handleClose" mode="create" />
        </DialogRoot>
      </div>
    </div>
    <PackagesTable v-if="packages?.length > 0" />
    <div v-else class="text-center py-10 text-gray-900 text-sm font-medium border border-gray-200">
      Paket bulunamadı.
    </div>
  </div>
</template>
<script setup>
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'
import { DialogRoot, DialogTrigger } from 'radix-vue'
import IconPlus from '../icons/IconPlus.vue'
import IconSearch from '../icons/IconSearch.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { usePackagesStore } from '@/stores/packages'
import { debounce } from 'lodash'
import PackagesTable from './PackagesTable.vue'
import PackageForm from './PackageForm.vue'

const { getPackages, setName } = usePackagesStore()
const { packages, name } = storeToRefs(usePackagesStore())

const isDialogOpen = ref(false)
const debouncedGetPackages = debounce((newName) => getPackages(), 400)

const handleSearch = async (newName) => {
  setName(newName)
  debouncedGetPackages(newName)
}

const handleClose = () => (isDialogOpen.value = false)
const handleOpen = () => (isDialogOpen.value = true)
</script>
