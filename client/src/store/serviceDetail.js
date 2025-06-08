import { defineStore } from 'pinia'

export const useServiceDetailStore = defineStore('serviceDetail', {
    state: () => ({
        service: null,
        guarantees: [],
        projects: {},
    }),
    actions: {
        setData({ service, guarantees, projects }) {
            this.service = service
            this.guarantees = guarantees
            this.projects = projects
        },
        clear() {
            this.service = null
            this.guarantees = []
            this.projects = {}
        }
    }
})
