<template>
  <div class="ShipInputs">
    <button v-on:click="updateShips">Button</button>
  </div>
</template>

<script>
export default {
  name: 'SurveyShips',
  data () {
    return {
      grid: {
        width: 5,
        height: 3
      },
      ships: [
        {
          startLocation: '1 1 E',
          instructions: 'RFRFRFRF'
        },
        {
          startLocation: '3 2 N',
          instructions: 'FRRFLLFFRRFLL'
        },
        {
          startLocation: '0 3 W',
          instructions: 'LLFFFLFLFL'
        }
      ]
    }
  },
  methods: {
    updateShips () {
      this.$store.dispatch('updateSurveyShips', {
        surveyShips: {
          grid: {
            width: this.width,
            height: this.height
          },
          ships: this.ships
        }
      })
    }
  }
}
</script>
