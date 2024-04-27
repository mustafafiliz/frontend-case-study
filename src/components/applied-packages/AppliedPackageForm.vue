<template>
  <DialogPortal>
    <DialogOverlay
      class="bg-gray-900 bg-opacity-20 blur data-[state=open]:animate-overlayShow fixed inset-0 z-30"
    />
    <DialogContent
      class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white py-5 px-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
    >
      <DialogTitle
        class="text-gray-900 font-medium m-0 text-xl border-b border-gray-200 pb-4"
      >
        {{ mode === "update" ? "Düzenle" : "Paket Uygula" }}
      </DialogTitle>
      <form
        @submit.prevent="handleSubmit"
        class="mt-4 max-h-[70vh] overflow-y-auto"
      >
        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-4">
            <label
              class="flex flex-col gap-2 text-sm font-medium text-gray-900"
            >
              Uzman
              <select
                :disabled="mode === 'update'"
                required
                @change="(e) => handleUserChange(JSON.parse(e.target.value))"
                class="bg-gray-100 border border-gray-300 text-sm text-gray-600 rounded-lg block disabled:border-gray-300 disabled:bg-gray-200 w-full px-2.5 h-[37px]"
              >
                <option :value="undefined"></option>
                <option
                  v-for="(item, index) in users"
                  :key="index"
                  :value="JSON.stringify({ id: item.id, name: item.name })"
                  :selected="item?.id === data?.userId"
                >
                  {{ item.name }}
                </option>
              </select>
            </label>
          </div>
          <div v-show="userPackages?.length > 0" class="col-span-4">
            <label
              class="flex flex-col gap-2 text-sm font-medium text-gray-900"
            >
              Paket Listesi
              <select
                :key="userPackages"
                required
                @change="(e) => handlePackageChange(e.target.value)"
                class="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full px-2.5 h-[37px]"
              >
                <option :value="undefined"></option>
                <option
                  v-for="(item, index) in userPackages"
                  :key="index || data?.packageId"
                  :selected="String(item.id) === formData?.packageId || false"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </label>
          </div>
          <div
            v-show="formData.userId && userPackages.length === 0"
            class="col-span-4 text-center font-medium text-sm"
          >
            Uzmana ait paket bulunamadı.
          </div>
          <template v-if="formData.packageName.length > 0">
            <div class="col-span-2">
              <label
                class="flex flex-col gap-2 text-sm font-medium text-gray-900"
              >
                Muayene Sayısı
                <Input
                  disabled="true"
                  type="number"
                  min="1"
                  required
                  :value="formData.examination"
                  @change="(value) => (formData.examination = value)"
                />
              </label>
            </div>
            <div class="col-span-2">
              <label
                class="flex flex-col gap-2 text-sm font-medium text-gray-900"
              >
                Kontrol Sayısı
                <Input
                  disabled="true"
                  type="number"
                  min="1"
                  required
                  :value="formData.control"
                  @change="(value) => (formData.control = value)"
                />
              </label>
            </div>
            <div class="col-span-4">
              <label
                class="flex flex-col gap-2 text-sm font-medium text-gray-900"
              >
                Paketin Geçerlilik Süresi
                <div class="relative">
                  <Input
                    disabled="true"
                    type="number"
                    min="1"
                    required
                    :value="formData.duration"
                    @change="(value) => (formData.duration = value)"
                  />
                  <span
                    class="absolute right-2 top-1/2 -translate-y-1/2 font-medium text-xs"
                  >
                    {{ formData.durationUnit }}
                  </span>
                </div>
              </label>
            </div>
            <div class="col-span-3">
              <label
                class="flex flex-col gap-2 text-sm font-medium text-gray-900"
              >
                Ücret
                <Input
                  disabled="true"
                  type="number"
                  min="0"
                  :value="formData.price"
                  @change="(value) => (formData.price = value)"
                />
              </label>
            </div>
            <div class="col-span-1">
              <label
                class="flex flex-col gap-2 font-medium text-sm text-gray-900"
              >
                Para Birimi
                <select
                  disabled="true"
                  required
                  class="bg-gray-200 border border-gray-400 text-gray-600 disabled:bg-gray-200 text-sm rounded-lg block w-full px-2.5 h-[37px]"
                >
                  <option selected value="TRY">{{ formData.currency }}</option>
                </select>
              </label>
            </div>
            <div class="col-span-4">
              <label
                class="flex flex-col gap-2 font-medium text-sm text-gray-900"
              >
                Paket Başlangıç Tarihi
                <div class="relative">
                  <input
                    required
                    :value="formData.startedAt"
                    @change="(e) => (formData.startedAt = e.target.value)"
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
            <div class="col-span-4">
              <label
                class="flex flex-col gap-2 text-sm font-medium text-gray-900"
              >
                Paket Notu
                <Input
                  type="text"
                  placeholder="Tedavi Notu..."
                  min="0"
                  :value="formData.note"
                  @change="(value) => (formData.note = value)"
                />
              </label>
            </div>
          </template>
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
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "radix-vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import Input from "@/components/ui/Input.vue";
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import Button from "../ui/Button.vue";
import { useAppliedPackagesStore } from "@/stores/applied-packages";
import dayjs from "dayjs";

const props = defineProps(["closeDialog", "data", "mode"]);
const { getUsers } = useUsersStore();
const { getPackagesByUser, createAppliedPackage, updateAppliedPackage } =
  useAppliedPackagesStore();
const { users } = storeToRefs(useUsersStore());

const userPackages = ref([]);
const loading = ref(false);
const formData = ref({
  startedAt: props.data?.startedAt
    ? dayjs(props.data.startedAt).format("YYYY-MM-DD")
    : "",
  userId: props.data?.userId || "",
  userName: props.data?.userName || "",
  packageId: props.data?.packageId || "",
  packageName: props.data?.packageName || "",
  examination: props.data?.examination || "",
  control: props.data?.control || "",
  duration: props.data?.duration || "",
  durationUnit: props.data?.durationUnit || "",
  note: props.data?.note || "",
  price: props.data?.price || "",
  currency: props.data?.currency || "",
});

const reset = () => {
  formData.value = {
    startedAt: "",
    userId: formData.value.userId,
    userName: formData.value.userName,
    packageId: "",
    packageName: "",
    examination: "",
    control: "",
    duration: "",
    durationUnit: "",
    note: "",
    price: "",
    currency: "",
  };
};

const handleSubmit = async () => {
  loading.value = true;

  try {
    if (props.mode === "update") {
      const leftExamination =
        props.data.packageId === formData.packageId
          ? props.data.leftExamination
          : 0;
      const leftControl =
        props.data.packageId === formData.packageId
          ? props.data.leftControl
          : 0;
      const payload = { ...formData.value, leftExamination, leftControl };
      await updateAppliedPackage(props.data?.id, payload);
      toast.success("Paket güncellendi.");
    } else {
      await createAppliedPackage({
        ...formData.value,
        startedAt: new Date(formData.value.startedAt).toISOString(),
      });
      toast.success("Paket eklendi.");
    }
  } catch (error) {
    toast.error("Beklenmedik bir hata meydana geldi.");
  } finally {
    loading.value = false;
    props.closeDialog();
  }
};

const handleUserChange = async (user) => {
  try {
    if (props.mode === "create") {
      reset();
      formData.value = {
        ...formData.value,
        userId: user.id,
        userName: user.name,
      };
    }
    const data = await getPackagesByUser(user.id);
    console.log(data);
    userPackages.value = data;
  } catch (error) {
    toast.error("Beklenmedik bir hata meydana geldi.");
    return error;
  }
};

const handlePackageChange = (id) => {
  const selected = userPackages.value.find(
    (item) => String(item.id) === String(id)
  );
  if (selected) {
    const {
      id,
      name,
      examination,
      control,
      duration,
      durationUnit,
      price,
      currency,
    } = selected;
    console.log(id);
    formData.value = {
      ...formData.value,
      userId: formData.value.userId,
      userName: formData.value.userName,
      packageId: String(id),
      packageName: name,
      examination,
      control,
      duration,
      durationUnit,
      note: "",
      price,
      currency,
    };
  } else toast.error("Beklenmedik bir hata meydana geldi.");
};
props.mode === "update" &&
  handleUserChange({ id: props.data.userId, name: props.data.userName });
getUsers();
</script>
