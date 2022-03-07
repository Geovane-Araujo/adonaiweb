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
    }
  },
  methods: {
    render (label, datasets, tp) {
      this.renderChart({
        labels: label,
        datasets: this.onData(datasets, tp)
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false
        }
      })
    },
    onData (datasets, tp) {
      if (tp === undefined || tp === 1) {
        return datasets
      }

      const dataset = []

      datasets.forEach(item => {
        const data = {
          label: item.label,
          data: item.data,
          backgroundColor: item.backgroundColor,
          stack: item.slack
        }
        dataset.push(JSON.parse(JSON.stringify(data)))
      })

      return dataset
    }
  }
}
