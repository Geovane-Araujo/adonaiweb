<template id="adonaigrid">
  <table class="table table-botdered table-striped table-sm table-hover table-fixed">
      <thead  style="max-height:10vh; overflow-y:auto;">
        <tr class="text-left bg-info txt-light style=height: 10px;">
          <th v-for="title in titulos" :key="title.ID">{{ title }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-left" v-for="registro in registros" :key="registro.id">
          <td v-for="item in registro" :key="item.id">{{ item }}</td>
          <td>
            <a href="#"  class="text-success"><i class="fas fa-edit"></i></a>
            &nbsp;
            <a href="#" class="text-danger"><i class="far fa-trash-alt"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script src="./grid.js">
</script>
<style lang="scss" scoped>
</style>
