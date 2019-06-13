<template>
  <div class="SurveyShips">
    <ShipInputs/>
    <OutputList :grid="grid" :ships="ships"/>
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
