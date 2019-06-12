<template>
  <div class="SurveyShips">
    <OutputList :grid="grid" :ships="ships"/>
  </div>
</template>

<script>
import OutputList from '@/components/OutputList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'SurveyShips',
  components: {
    OutputList
  },
  computed: {
    ...mapGetters([
      'ships',
      'grid'
    ])
  }
}
</script>
