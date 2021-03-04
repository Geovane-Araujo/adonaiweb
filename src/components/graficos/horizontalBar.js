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
        maintainAspectRatio: false
      })
    }
  }
}
