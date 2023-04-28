import { ServiceRoutes } from "./ServicesRoutes"

export class CrudService{
    service = new new ServiceRoutes()

    async save(service, form){
        this.openloading = true
        await axios.post(service.url + service, form, { headers: { Authorization: 'Bearer ' + this.user.token } }).then(res => {
          if (res.data.ret !== undefined && res.data.ret === 'success') {
            this.openModal = false
            this.openloading = false
            this.$refs.grid.get(this.onGridInitialize('menu_pessoa_membros'))
            this.$toast.add({ severity: 'success', summary: 'AdonaiSoft', detail: 'Salvo com sucesso', life: 5000 })
          } else {
            this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: res.data.motivo, life: 5000 })
            this.openloading = false
          }
          
        }).catch(err => {
          this.$toast.add({ severity: 'error', summary: 'AdonaiSoft', detail: err.response.data.motivo, life: 5000 })
          this.openloading = false
        })
    }

}