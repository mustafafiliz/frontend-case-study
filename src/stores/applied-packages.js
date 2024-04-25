import { API } from '@/axios/instance'
import { defineStore } from 'pinia'

export const useAppliedPackagesStore = defineStore({
  id: 'applied-packages',
  state: () => ({
    appliedPackages: [],
    name: '',
    _sort: '',
    _per_page: 4,
    page: 1,
    totalPage: 1,
    loading: false,
    error: null
  }),
  actions: {
    async getAppliedPackages() {
      try {
        this.loading = true
        const { data } = await API.get('/applied-packages', {
          params: {
            packageName: this.name,
            _page: this.page,
            _per_page: this._per_page,
            _sort: this._sort
          }
        })
        this.appliedPackages = data.data
        this.totalPage = data.pages
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async getPackagesByUser(userId) {
      try {
        const { data } = await API.get(`/packages?status=1`)
        return data.filter((p) => p.userIds.some((user) => String(user.id) === String(userId)))
      } catch (error) {
      } finally {
      }
    },
    async createAppliedPackage(payload) {
      try {
        await API.post(`/applied-packages`, {
          ...payload,
          leftExamination: 0,
          leftControl: 0
        })
        await this.getAppliedPackages()
      } catch (error) {
        this.error = error
      } finally {
      }
    },
    async updateAppliedPackage(packageId, payload) {
      try {
        await API.patch(`/applied-packages/${packageId}`, payload)
        await this.getAppliedPackages()
      } catch (error) {
        this.error = error
      } finally {
      }
    },
    async deleteAppliedPackage(packageId) {
      try {
        await API.delete(`/applied-packages/${packageId}`)
        await this.getAppliedPackages()
      } catch (error) {
      } finally {
      }
    },
    setName(name) {
      this.name = name
    },
    setPage(payload) {
      this.page = payload
    },
    setSort(paylaod) {
      this._sort = paylaod
    }
  }
})
