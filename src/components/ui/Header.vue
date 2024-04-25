<template>
  <header class="bg-primary-700 h-14 flex items-center">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center gap-10 w-full">
        <Logo />
        <nav class="border-white w-full">
          <ul class="flex items-center lg:px-0 px-3 gap-2 w-full">
            <li v-for="(item, index) in navs" :key="index">
              <router-link
                :key="route"
                :to="item.slug"
                class="flex items-center px-2 lg:px-4 h-[56px] text-white font-medium text-xs lg:text-sm relative"
                >{{ item.name }}
                <span
                  v-if="route.path === item.slug"
                  class="absolute bottom-0 left-0 right-0 border-b-4 border-white"
                ></span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <span class="text-white lg:flex hidden text-sm font-medium whitespace-nowrap"
        >Mustafa Filiz</span
      >
    </div>
  </header>
</template>
<script setup>
import Logo from './Logo.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navs = [
  {
    slug: '/packages',
    name: 'Paketler'
  },
  {
    slug: '/applied-packages',
    name: 'Uygulanan Paketler'
  },
  {
    slug: '/package-usages',
    name: 'Paket Hareketleri'
  }
]
</script>
