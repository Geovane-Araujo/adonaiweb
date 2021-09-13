import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    label: {
      type: Array,
      require: true
    },
    datasets: {
      type: Array,
      require: true
    },
    legenda: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    render (label, datasets) {
      this.renderChart({
        labels: label,
        datasets: datasets
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: this.legenda
        }
      })
    }
  }
}
