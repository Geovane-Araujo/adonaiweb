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
  methods: {
    render (label, datasets, local) {
      this.renderChart({
        labels: label,
        datasets: datasets,
        label: 'teste'
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: local
        }
      })
    }
  }
}
