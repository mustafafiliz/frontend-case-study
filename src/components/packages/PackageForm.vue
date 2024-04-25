<template>
  <DialogPortal>
    <DialogOverlay
      class="bg-gray-900 bg-opacity-20 blur data-[state=open]:animate-overlayShow fixed inset-0 z-30"
    />
    <DialogContent
      class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white py-5 px-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
    >
      <DialogTitle class="text-gray-900 font-medium m-0 text-xl border-b border-gray-200 pb-4">
        {{ mode === 'update' ? 'Paket Düzenle' : 'Paket Ekle' }}
      </DialogTitle>
      <form @submit.prevent="handleSubmit" class="mt-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Paket Adı
              <Input
                type="text"
                required
                :value="formData.name"
                @change="(value) => (formData.name = value)"
              />
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Muayene Sayısı
              <Input
                type="number"
                min="1"
                required
                :value="formData.examination"
                @change="(value) => (formData.examination = value)"
              />
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Kontrol Sayısı
              <Input
                type="number"
                min="1"
                required
                :value="formData.control"
                @change="(value) => (formData.control = value)"
              />
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Paketin Geçerlilik Süresi
              <Input
                type="number"
                min="1"
                required
                :value="formData.duration"
                @change="(value) => (formData.duration = value)"
              />
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm text-gray-900">
              <span class="h-5 flex" />
              <select
                required
                @change="
                  (e) => {
                    formData.durationUnit = e.target.value
                  }
                "
                class="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full px-2.5 h-[37px]"
              >
                <option
                  v-for="(item, index) in durationUnits"
                  :key="index"
                  :selected="formData.durationUnit === item"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Ücret
              <Input
                type="number"
                min="0"
                :value="formData.price"
                @change="(value) => (formData.price = value)"
              />
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 font-medium text-sm text-gray-900">
              Para Birimi
              <select
                required
                class="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full px-2.5 h-[37px]"
              >
                <option value="TRY">TRY</option>
              </select>
            </label>
          </div>
          <div class="col-span-2">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Uzman/Uzmanlar Ata
              <multiselect
                v-model="formData.userIds"
                :options="users"
                placeholder=""
                label="name"
                track-by="id"
                multiple
                :close-on-select="false"
                @select="onSelect"
                @remove="onRemove"
                noOptionsLabel=""
                noOptionsText=""
              ></multiselect>
            </label>
          </div>
        </div>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <Button
              type="submit"
              :loading="loading"
              :name="mode === 'update' ? 'Paket Güncelle' : 'Paket Ekle'"
            />
          </DialogClose>
        </div>
      </form>
      <DialogClose
        class="absolute top-[18px] right-[18px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center"
        aria-label="Close"
      >
        <span @click="closeDialog" class="flex items-center justify-center">
          <IconClose />
        </span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
<script setup>
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from 'radix-vue'
import IconClose from '@/components/icons/IconClose.vue'
import Input from '@/components/ui/Input.vue'
import { useUsersStore } from '@/stores/users'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { durationUnits, currencies } from '@/mocks/static'
import { usePackagesStore } from '@/stores/packages'
import { toast } from 'vue3-toastify'
import Button from '../ui/Button.vue'
import Multiselect from 'vue-multiselect'

const props = defineProps(['closeDialog', 'data', 'mode'])
const { getUsers } = useUsersStore()
const { createPackage, updatePackage } = usePackagesStore()
const { users } = storeToRefs(useUsersStore())

const loading = ref(false)
const formData = ref({
  name: props.data?.name || '',
  control: props.data?.control || '',
  duration: props.data?.duration || '',
  durationUnit: props.data?.durationUnit || durationUnits[0],
  price: props.data?.price || '',
  currency: props.data?.currency || currencies[0],
  status: 1,
  examination: props.data?.examination || '',
  userIds: props.data?.userIds || []
})

const handleSubmit = async () => {
  loading.value = true
  console.log(formData.value.userIds)
  try {
    if (props.mode === 'update') {
      await updatePackage(props.data?.id, formData.value)
      toast.success('Paket güncellendi.')
    } else {
      await createPackage(formData.value)
      toast.success('Paket eklendi.')
    }
  } catch (error) {
    toast.error('Beklenmedik bir hata meydana geldi.')
  } finally {
    loading.value = false
    props.closeDialog()
  }
}

const selectedValues = ref([])
const options = ref([
  { id: 1, name: 'Seçenek 1' },
  { id: 2, name: 'Seçenek 2' },
  { id: 3, name: 'Seçenek 3' }
  // Diğer seçenekler buraya eklenebilir
])

const onSelect = (option) => {
  console.log('Seçildi:', option)
}

const onRemove = (option) => {
  console.log('Kaldırıldı:', option)
}

getUsers()
</script>
