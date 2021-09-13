import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
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
        datasets: datasets,
        order: 1
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
