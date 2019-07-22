<template>
  <div class="dashboard-container">
    <component :is="'adminDashboard'" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([

    ])
  },
  created() {

  }
}
</script>
