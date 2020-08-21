export default {
  toast: {
    positionClass: 'toast-bottom-center',
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    progressBar: true,
    closeButton: true,
    preventDuplicates: true
  },
  validamenu: false,
  toasta: function (form) {
    if (form.add) {
      this.$toastr.success('Salvo com Sucesso', 'AdonaiSoft Diz:', this.toast)
    } else if (form.edit) {
      this.$toastr.success('Editado com Sucesso', 'AdonaiSoft Diz:', this.toast)
    } else {
      this.$toastr.success('Excluido com Sucesso', 'AdonaiSoft Diz:', this.toast)
    }
  },
  error: function (err) {
    this.$toastr.success(err, 'AdonaiSoft Diz:', this.toast)
  }
}
