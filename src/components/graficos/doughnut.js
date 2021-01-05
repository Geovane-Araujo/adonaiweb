import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
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
        datasets: datasets
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
