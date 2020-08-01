import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    label: {
      type: Array,
      require: true
    },
    datasets: {
      type: Array,
      require: true
    }
  },
  mounted () {
    this.renderChart({
      labels: this.label,
      datasets: this.datasets
    },
    {
      responsive: true,
      maintainAspectRatio: false
    })
  }
}
