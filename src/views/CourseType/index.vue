<template>
  <div class="dashboard-editor-container">
    <category-panel-group/>
  </div>
</template>

<script>
import CategoryPanelGroup from './components/courseTypePanelGroup'

export default {
  name: 'Index',
  components: {
    CategoryPanelGroup
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
