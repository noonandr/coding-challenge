<template>
  <div class="SurveyShips">
    <h1>Survey Ships</h1>
    <ShipInputs/>
    <OutputList/>
  </div>
</template>

<script>
import OutputList from '@/components/OutputList.vue'
import ShipInputs from '@/components/ShipInputs.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'SurveyShips',
  components: {
    OutputList,
    ShipInputs
  },
  computed: {
    ...mapGetters([
      'ships',
      'grid'
    ])
  }
}
</script>

<style lang="scss" scoped>

.SurveyShips {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px;
}
</style>
