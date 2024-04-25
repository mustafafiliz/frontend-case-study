import { API } from '@/axios/instance'
import { defineStore } from 'pinia'

export const usePackagesStore = defineStore({
  id: 'packages',
  state: () => ({
    packages: [],
    name: '',
    _sort: '',
    _per_page: 4,
    page: 1,
    totalPage: 1,
    loading: false,
    error: null
  }),
  actions: {
    async getPackages() {
      try {
        this.loading = true
        const { data } = await API.get('/packages', {
          params: {
            name: this.name,
            _page: this.page,
            _per_page: this._per_page,
            _sort: this._sort
          }
        })
        this.packages = data.data
        this.totalPage = data.pages
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async createPackage(payload) {
      try {
        await API.post(`/packages`, payload)
        await this.getPackages()
      } catch (error) {
        this.error = error
      } finally {
      }
    },
    async updatePackage(packageId, payload) {
      try {
        await API.patch(`/packages/${packageId}`, payload)
        await this.getPackages()
      } catch (error) {
        this.error = error
      } finally {
      }
    },
    async deletePackage(packageId) {
      try {
        await API.delete(`/packages/${packageId}`)
        await this.getPackages()
      } catch (error) {
      } finally {
      }
    },
    async changeStatus(packageId) {
      const _package = this.packages.find((pkg) => String(pkg.id) === String(packageId))
      try {
        await API.patch(`/packages/${packageId}`, {
          ..._package,
          status: _package.status === 0 ? 1 : 0
        })
        this.getPackages()
      } catch (error) {
      } finally {
      }
    },
    setName(payload) {
      this.name = payload
    },
    setPage(payload) {
      this.page = payload
    },
    setSort(paylaod) {
      this._sort = paylaod
    }
  }
})
