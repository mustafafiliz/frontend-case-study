<template>
  <DialogPortal>
    <DialogOverlay
      class="bg-gray-900 bg-opacity-20 blur data-[state=open]:animate-overlayShow fixed inset-0 z-30"
    />
    <DialogContent
      class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white py-5 px-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
    >
      <DialogTitle class="text-gray-900 font-medium m-0 text-xl border-b border-gray-200 pb-4">
        {{ mode === 'update' ? 'Düzenle' : 'Paketten Kullan' }}
      </DialogTitle>
      <div class="flex items-center justify-between py-4 border-b border-gray-200">
        <h5 class="font-medium text-gray-500 text-sm">İlgili Paket Adı</h5>
        <h5 class="font-medium text-[#1C212E] text-sm">{{ data.packageName }}</h5>
      </div>
      <form @submit.prevent="handleSubmit" class="mt-5">
        <div class="grid grid-cols-1 gap-4">
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              İlgili Uzman
              <select
                disabled
                class="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full px-2.5 h-[37px]"
              >
                <option selected>{{ data.userName }}</option>
              </select>
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Paket Türü
              <select
                required
                @change="(e) => handlePackageTypeChange(e.target.value)"
                class="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full px-2.5 h-[37px]"
              >
                <option :value="undefined"></option>
                <option v-for="(item, index) in types" :key="index" :value="item">
                  {{ item }}
                </option>
              </select>
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 font-medium text-sm text-gray-900">
              Kullanım Tarihi
              <div class="relative">
                <input
                  required
                  :key="formData.usageAt"
                  :value="formData.usageAt"
                  :min="data.startedAt"
                  @change="
                    (e) => {
                      const startDate = dayjs(data.startedAt)
                      const usageDate = dayjs(e.target.value)
                      if (!startDate.isAfter(usageDate)) {
                        formData.usageAt = e.target.value
                      } else {
                        formData.usageAt = ''
                        formData.usageAt = undefined
                        return toast.error(
                          `Paket kullanım tarihi başlangıç tarihinden önce olamaz. ${startDate.format('DD.MM.YYYY')} tarihinden büyük bir değer giriniz.`
                        )
                      }
                    }
                  "
                  type="date"
                  class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  placeholder="Select date"
                />
                <span
                  class="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center"
                >
                  <IconCalendar />
                </span>
              </div>
            </label>
          </div>
          <div class="col-span-1">
            <label class="flex flex-col gap-2 text-sm font-medium text-gray-900">
              Görüşme Notu
              <Input
                type="text"
                placeholder="Tedavi Notu..."
                min="0"
                :value="formData.note"
                @change="(value) => (formData.note = value)"
              />
            </label>
          </div>
        </div>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <Button
              type="submit"
              :loading="loading"
              :name="mode === 'update' ? 'Güncelle' : 'Paketten Kullan'"
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
import IconCalendar from '@/components/icons/IconCalendar.vue'
import Input from '@/components/ui/Input.vue'
import { useUsersStore } from '@/stores/users'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import Button from '../ui/Button.vue'
import { packageTypes } from '@/mocks/static'
import { usePackageUsagesStore } from '@/stores/package-usages'
import dayjs from 'dayjs'

const props = defineProps(['closeDialog', 'data'])
const { getUsers } = useUsersStore()
const { createPackageUsage } = usePackageUsagesStore()

const loading = ref(false)
const formData = ref({
  type: props?.data?.type || '',
  appliedPackageId: props?.data?.id,
  packageId: props?.data?.packageId,
  packageName: props?.data?.packageName,
  userId: props?.data?.userId,
  userName: props?.data?.userName,
  note: '',
  usageAt: ''
})

const types = packageTypes.filter((type) => {
  if (type === 'Muayene' && Number(props.data.leftExamination) === Number(props.data.examination))
    return
  else if (type === 'Kontrol' && Number(props.data.leftControl) === Number(props.data.control))
    return
  else return type
})

const handleSubmit = async () => {
  loading.value = true

  try {
    await createPackageUsage({
      ...formData.value,
      usageAt: new Date(formData.value.usageAt).toISOString()
    })
    toast.success('Paket kullanıldı.')
  } catch (error) {
    toast.error('Beklenmedik bir hata meydana geldi.')
  } finally {
    loading.value = false
    props.closeDialog()
  }
}

const handlePackageTypeChange = (type) => {
  formData.value.type = type
}

getUsers()
</script>
