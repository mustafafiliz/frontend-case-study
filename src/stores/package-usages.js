import { API } from '@/axios/instance'
import { defineStore } from 'pinia'
import { useAppliedPackagesStore } from './applied-packages'

export const usePackageUsagesStore = defineStore({
  id: 'package-usages',
  state: () => ({
    packageUsages: [],
    _sort: '',
    _per_page: 4,
    page: 1,
    totalPage: 1,
    loading: false,
    error: null
  }),
  actions: {
    async getPackageUsages() {
      try {
        this.loading = true
        const { data } = await API.get('/package-usages', {
          params: {
            _page: this.page,
            _per_page: this._per_page,
            _sort: this._sort
          }
        })
        this.packageUsages = data.data
        this.totalPage = data.pages
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async createPackageUsage(payload) {
      const { appliedPackageId } = payload
      try {
        await API.post(`/package-usages`, payload)
        const { data: appliedPackages } = await API.get('/applied-packages')
        const _package = appliedPackages.find((p) => p.id === appliedPackageId)
        payload
        await API.patch(`/applied-packages/${appliedPackageId}`, {
          ..._package,
          leftExamination:
            payload?.type === 'Muayene' ? _package.leftExamination + 1 : _package.leftExamination,
          leftControl: payload?.type === 'Kontrol' ? _package.leftControl + 1 : _package.leftControl
        })
        const { getAppliedPackages } = useAppliedPackagesStore()
        getAppliedPackages()
      } catch (error) {
        this.error = error
      } finally {
      }
    },
    async updatePackageUsage(id, payload) {
      try {
        await API.patch(`/package-usages/${id}`, payload)
        // await this.getPackageUsages()
      } catch (error) {
        this.error = error
      } finally {
      }
    },
    async deletePackageUsage(id) {
      try {
        await API.delete(`/package-usages/${id}`)
        await this.getPackageUsages()
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
