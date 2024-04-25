import { API } from '@/axios/instance'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: [],
    loading: false,
    error: null,
    init: false
  }),
  actions: {
    async getUsers() {
      if (!this.init) {
        try {
          this.loading = true
          const { data } = await API.get('/users')
          this.users = data
        } catch (error) {
          this.error = error
        } finally {
          this.loading = false
          this.init = true
        }
      }
    }
  }
})
