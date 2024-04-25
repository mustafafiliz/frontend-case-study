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
            <Button :onClick="handleOpen" name="Paket Uygula">
              <template #icon>
                <IconPlus />
              </template>
            </Button>
          </DialogTrigger>
          <AppliedPackageForm v-if="isDialogOpen" :closeDialog="handleClose" mode="create" />
        </DialogRoot>
      </div>
    </div>
    <template v-if="appliedPackages?.length > 0">
      <AppliedPackageTable :name="name" />
    </template>
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
import { debounce } from 'lodash'
import { useAppliedPackagesStore } from '@/stores/applied-packages'
import AppliedPackageTable from './AppliedPackageTable.vue'
import AppliedPackageForm from './AppliedPackageForm.vue'

const { getAppliedPackages, setName } = useAppliedPackagesStore()
const { appliedPackages, name } = storeToRefs(useAppliedPackagesStore())

const isDialogOpen = ref(false)
const debouncedGetPackages = debounce((newName) => getAppliedPackages(), 400)

const handleSearch = async (newName) => {
  setName(newName)
  debouncedGetPackages(newName)
}

const handleClose = () => (isDialogOpen.value = false)
const handleOpen = () => (isDialogOpen.value = true)
</script>
