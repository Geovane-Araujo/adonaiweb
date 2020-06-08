<template>
  <div>
    <FullCalendar class="agenda"
    defaultView="dayGridMonth"
    :plugins="calendarPlugins"
    :events="[
      { title: 'event 1', date: '2020-06-07' },
      { title: 'event 2', date: '2020-06-08' }
    ]"
    />
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data () {
    return {
      calendarPlugins: [dayGridPlugin]
    }
  }
}
</script>
<style lang="scss" scoped>
.agenda {
  height: 100vh;
  background-color: white;
}
</style>
