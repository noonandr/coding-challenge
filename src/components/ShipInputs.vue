<template>
  <div class="ShipInputs">
    <h3>Grid width and height</h3>
    <input v-model="width" placeholder="width">
    <input v-model="height" placeholder="height">
    <h3>Ship Locations and Instructions</h3>
    <div v-for="(ship, key) in ships" :key="key">
      <input type="text" v-model="ship.startLocation" :placeholder="'Ship ' +  (ship.shipCount + 1) + ' Location'">
      <input type="text" v-model="ship.instructions" :placeholder="'Ship ' +  (ship.shipCount + 1) + ' Instructions'">
    </div>
    <button class="new-ship" @click="newShip">+ Add Another Ship</button>
    <button class="sail-ships" @click="updateShips">Sail Ships</button>
  </div>
</template>

<script>
export default {
  name: 'SurveyShips',
  data () {
    return {
      ships: [{
        startLocation: '',
        instructions: '',
        shipCount: 0
      }],
      shipCount: 0,
      width: '',
      height: ''
    }
  },
  methods: {
    newShip () {
      this.ships.push({
        startLocation: '',
        instructions: '',
        shipCount: ++this.shipCount
      })
    },
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

<style lang="scss" scoped>

.new-ship {
  display: in-line-block;
  padding: 8px 16px;
  margin: 20px 0;
  background-color: #ED7C24;
  border: none;
  border-radius: 4px;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
}

.sail-ships {
  display: block;
  padding: 8px 16px;
  margin: 20px 0;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
}
</style>
